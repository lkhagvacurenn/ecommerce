// src/services/api.js
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
  collectionGroup
} from "firebase/firestore";
import { db } from "../firebase/firestore";

/*
 Product shape (as provided):
 availabilityStatus: boolean
 brand: string
 category_id: string
 description: string
 discount_percentage: number
 price: number
 discounted_price: number
 images: array
 title: string
 release_date: date (JS Date or Firestore Timestamp)
 stock: number
 subcollections: reviews, sizes, colors, branches
*/

const PRODUCTS_COL = "products";
const SUBCOLS = ["reviews", "sizes", "colors", "branches"];
const CHUNK_SIZE = 500; // max writes per batch

// --- Helpers ---
function normalizeDoc(snap) {
  return { id: snap.id, ...snap.data() };
}

// --- Products ---

export async function getProducts({ limitCount = 50, orderByField = "release_date", order = "desc" } = {}) {
  const colRef = collection(db, PRODUCTS_COL);
  const q = query(colRef, orderBy(orderByField, order), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(normalizeDoc);
}

export async function getProduct(productId) {
  const dref = doc(db, PRODUCTS_COL, productId);
  const snap = await getDoc(dref);
  if (!snap.exists()) return null;
  return normalizeDoc(snap);
}

export async function addProduct(product) {
  // normalize product fields
  const payload = {
    availabilityStatus: !!product.availabilityStatus,
    brand: product.brand ?? "",
    category_id: product.category_id ?? "",
    description: product.description ?? "",
    discount_percentage: product.discount_percentage !== undefined ? Number(product.discount_percentage) : 0,
    price: product.price !== undefined ? Number(product.price) : 0,
    discounted_price: product.discounted_price !== undefined ? Number(product.discounted_price) : null,
    images: Array.isArray(product.images) ? product.images : (product.images ? [product.images] : []),
    title: product.title ?? "",
    release_date: product.release_date ?? serverTimestamp(), // if client supplies Date, it will be stored; else serverTimestamp
    stock: product.stock !== undefined ? Number(product.stock) : 0,
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, PRODUCTS_COL), payload);
  return ref.id;
}

export async function updateProduct(productId, updates) {
  const dref = doc(db, PRODUCTS_COL, productId);
  const payload = { ...updates, updatedAt: serverTimestamp() };

  // cast numeric fields if present
  if (payload.discount_percentage !== undefined) payload.discount_percentage = Number(payload.discount_percentage);
  if (payload.price !== undefined) payload.price = Number(payload.price);
  if (payload.discounted_price !== undefined) payload.discounted_price = Number(payload.discounted_price);
  if (payload.stock !== undefined) payload.stock = Number(payload.stock);
  if (payload.images && !Array.isArray(payload.images)) payload.images = [payload.images];

  await updateDoc(dref, payload);
  return productId;
}

export async function deleteProduct(productId) {
  const dref = doc(db, PRODUCTS_COL, productId);
  await deleteDoc(dref);
  return productId;
}

// --- Subcollection generic helpers ---

export async function getSubcollection(productId, subcolName) {
  if (!SUBCOLS.includes(subcolName)) throw new Error("Invalid subcollection");
  const colRef = collection(db, PRODUCTS_COL, productId, subcolName);
  const snap = await getDocs(colRef);
  return snap.docs.map(normalizeDoc);
}

export async function addSubDoc(productId, subcolName, data) {
  if (!SUBCOLS.includes(subcolName)) throw new Error("Invalid subcollection");
  const colRef = collection(db, PRODUCTS_COL, productId, subcolName);
  const payload = { ...data, createdAt: serverTimestamp() };
  const ref = await addDoc(colRef, payload);
  return ref.id;
}

export async function updateSubDoc(productId, subcolName, docId, updates) {
  if (!SUBCOLS.includes(subcolName)) throw new Error("Invalid subcollection");
  const dref = doc(db, PRODUCTS_COL, productId, subcolName, docId);
  await updateDoc(dref, { ...updates, updatedAt: serverTimestamp() });
  return docId;
}

export async function deleteSubDoc(productId, subcolName, docId) {
  if (!SUBCOLS.includes(subcolName)) throw new Error("Invalid subcollection");
  const dref = doc(db, PRODUCTS_COL, productId, subcolName, docId);
  await deleteDoc(dref);
  return docId;
}

// Convenience specific functions for reviews / sizes / colors / branches

// Reviews: { client_id: string, comment: string, date: Date/Timestamp, rate: number }
export async function getProductReviews(productId) {
  return getSubcollection(productId, "reviews");
}
export async function addReview(productId, { client_id, comment, rate, date }) {
  return addSubDoc(productId, "reviews", { client_id, comment, rate: Number(rate), date: date ?? serverTimestamp() });
}

// Sizes: { size: string, is_available: boolean }
export async function getProductSizes(productId) {
  return getSubcollection(productId, "sizes");
}
export async function addSize(productId, { size, is_available = true }) {
  return addSubDoc(productId, "sizes", { size, is_available: !!is_available });
}

// Colors: { color: string, is_available: boolean }
export async function getProductColors(productId) {
  return getSubcollection(productId, "colors");
}
export async function addColor(productId, { color, is_available = true }) {
  return addSubDoc(productId, "colors", { color, is_available: !!is_available });
}

// Branches: { branch_id: string, is_available: boolean }
export async function getProductBranches(productId) {
  return getSubcollection(productId, "branches");
}
export async function addBranch(productId, { branch_id, is_available = true }) {
  return addSubDoc(productId, "branches", { branch_id, is_available: !!is_available });
}

// --- Delete product and all its subcollections, chunked ---
export async function deleteProductAndSubcollections(productId) {
  // iterate each subcollection and delete its docs in chunked batches
  for (const sub of SUBCOLS) {
    const colRef = collection(db, PRODUCTS_COL, productId, sub);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const docs = snap.docs; // array of QueryDocumentSnapshot
      for (let i = 0; i < docs.length; i += CHUNK_SIZE) {
        const batch = writeBatch(db);
        const chunk = docs.slice(i, i + CHUNK_SIZE);
        chunk.forEach(d => batch.delete(d.ref));
        await batch.commit();
      }
    }
  }

  // finally, delete the product doc (single delete)
  await deleteProduct(productId);
  return productId;
}

export async function getAllColorsGrouped() {
  const snap = await getDocs(collectionGroup(db, "colors"));
  const arr = snap.docs.map(d => {
    const productRef = d.ref.parent.parent;
    const productId = productRef ? productRef.id : null;
    return { id: d.id, productId, ...d.data() };
  });
  return arr.reduce((acc, c) => {
    if (!c.productId) return acc;
    acc[c.productId] = acc[c.productId] || [];
    acc[c.productId].push(c);
    return acc;
  }, {});
}

export async function getCategories() {
  const colRef = collection(db, "categories");
  const snap = await getDocs(colRef);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch all branches from top-level "branches" collection.
 * Each branch doc can have { name, ... }.
 * Returns array: [{ id, name, ...otherFields }, ...]
 */
export async function getBranches() {
  const colRef = collection(db, "branches");
  const snap = await getDocs(colRef);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}