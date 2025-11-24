// src/services/products.js
import axios from "axios";

const BASE = "https://dummyjson.com/products";

export async function getProducts({ limit = 100, skip = 0 } = {}) {
  try {
    const res = await axios.get(BASE, { params: { limit, skip } });
    // res.data: { products, total, skip, limit }
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}

export async function getProductsByCategory(category, { limit = 100, skip = 0 } = {}) {
  try {
    const res = await axios.get(`${BASE}/category/${encodeURIComponent(category)}`, {
      params: { limit, skip },
    });
    // some endpoints return { products, total } or array; normalize:
    return res.data;
  } catch (err) {
    console.error("Error fetching products by category:", err);
    throw err;
  }
}

export async function searchProducts(q, { limit = 100, skip = 0 } = {}) {
  try {
    const res = await axios.get(`${BASE}/search`, { params: { q, limit, skip } });
    return res.data; // { products, total, skip, limit }
  } catch (err) {
    console.error("Error searching products:", err);
    throw err;
  }
}

export async function getCategories() {
  try {
    const res = await axios.get(`${BASE}/categories`);
    // res.data is an array of strings
    return Array.isArray(res.data) ? res.data.slice(0,10) : [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw err;
  }
}

export async function getProductById(id) {
  try {
    const res = await axios.get(`${BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching product by id:", err);
    throw err;
  }
}