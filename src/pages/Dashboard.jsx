// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";

// import service functions (from your existing src/services/products.js)
import {
  getCategories,
  getBranches,
  addProduct,
  updateProduct,
  addSize,
  addColor,
  addBranch
} from "../services/products";

// storage helper
import { uploadProductImages } from "../services/storage";

export default function Dashboard() {
  // form state
  const [form, setForm] = useState({
    title: "",
    price: "", // string input; convert before submit
    discount_percentage: "", // string -> number
    discounted_price: 0, // computed
    description: "",
    brand: "",
    category_id: "", // selected category id
    images: [], // FileList or array of files
    release_date: null, // we'll let addProduct use serverTimestamp if null
    stock: "",
    availabilityStatus: true,
    categoryOptions: [],
    branchOptions: [], // available branches to choose from
    selectedBranches: [] // array of branch ids (will create branch subdocs with is_available true)
  });

  // dynamic lists for sizes and colors
  const [sizes, setSizes] = useState([{ size: "", is_available: true }]);
  const [colors, setColors] = useState([{ color: "", is_available: true }]);
  const [imagesFiles, setImagesFiles] = useState([]); // actual File[] for upload

  // UI state
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // compute discounted price whenever price or discount_percentage change
    const p = Number(form.price) || 0;
    const d = Number(form.discount_percentage) || 0;
    const discounted = Math.round((p * (1 - d / 100)) * 100) / 100; // rounded to 2 decimals
    setForm(f => ({ ...f, discounted_price: discounted }));
  }, [form.price, form.discount_percentage]);

  useEffect(() => {
    // fetch categories and branches using API functions
    const loadOptions = async () => {
      try {
        const [cats, branches] = await Promise.all([getCategories(), getBranches()]);
        setForm(f => ({ ...f, categoryOptions: cats, branchOptions: branches }));
      } catch (e) {
        console.error("Failed to load categories/branches", e);
      }
    };
    loadOptions();
  }, []);

  // helpers to update arrays
  const updateSize = (index, key, value) => {
    setSizes(prev => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  };
  const addSizeRow = () => setSizes(prev => [...prev, { size: "", is_available: true }]);
  const removeSizeRow = (idx) => setSizes(prev => prev.filter((_, i) => i !== idx));

  const updateColor = (index, key, value) => {
    setColors(prev => prev.map((c, i) => (i === index ? { ...c, [key]: value } : c)));
  };
  const addColorRow = () => setColors(prev => [...prev, { color: "", is_available: true }]);
  const removeColorRow = (idx) => setColors(prev => prev.filter((_, i) => i !== idx));

  // images input change
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImagesFiles(files);
  };

  const toggleBranchSelection = (branchId) => {
    setForm(f => {
      const exists = f.selectedBranches.includes(branchId);
      return {
        ...f,
        selectedBranches: exists ? f.selectedBranches.filter(id => id !== branchId) : [...f.selectedBranches, branchId]
      };
    });
  };


  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setUploadProgress(0);

    try {
      // validate minimal required fields
      if (!form.title.trim()) throw new Error("Title is required");
      if (!form.category_id) throw new Error("Select a category");
      const priceNum = Number(form.price);
      if (isNaN(priceNum) || priceNum < 0) throw new Error("Enter valid price");

      // prepare product payload
      // UI stores category as name; map it back to category id for storage
      const categoryObj = form.categoryOptions.find(c => c.name === form.category_id);
      const productPayload = {
        title: form.title.trim(),
        price: priceNum,
        discount_percentage: Number(form.discount_percentage) || 0,
        discounted_price: Number(form.discounted_price) || 0,
        description: form.description || "",
        brand: form.brand || "",
        category_id: categoryObj ? categoryObj.id : form.category_id,
        images: [], // will update after upload
        release_date: null, // leave null to let addProduct use serverTimestamp
        stock: Number(form.stock) || 0,
        availabilityStatus: !!form.availabilityStatus
        // createdAt will be added inside addProduct service
      };

      // 1) create product (no images yet)
      const productId = await addProduct(productPayload);
      // addProduct returns the new doc id
      setMessage(`Product created: ${productId}. Uploading images and subcollections...`);

      // 2) upload images (if any) and update product images field
      let imageUrls = [];
      if (imagesFiles.length > 0) {
        imageUrls = await uploadProductImages(productId, imagesFiles, (prog) => setUploadProgress(prog));
        // update product with images array
        await updateProduct(productId, { images: imageUrls });
      }

      // 3) add sizes subcollection
      for (const s of sizes) {
        if (s.size && s.size.trim()) {
          await addSize(productId, { size: s.size.trim(), is_available: !!s.is_available });
        }
      }

      // 4) add colors subcollection
      for (const c of colors) {
        if (c.color && c.color.trim()) {
          await addColor(productId, { color: c.color.trim(), is_available: !!c.is_available });
        }
      }

      // 5) add branches subcollection based on selected branch names
      // UI stores selected branch *names* (for user-friendly selection). Map names back to IDs
      // before adding branch subdocs. Each branch doc: { branch_id, is_available: true }
      for (const selectedName of form.selectedBranches) {
        const branchObj = form.branchOptions.find(b => (b.name ?? b.id) === selectedName);
        const branchId = branchObj ? branchObj.id : selectedName; // fallback to selectedName if no match
        await addBranch(productId, { branch_id: branchId, is_available: true });
      }

      setMessage("Product and subcollections successfully created.");
      // reset form
      setForm({
        title: "",
        price: "",
        discount_percentage: "",
        discounted_price: 0,
        description: "",
        brand: "",
        category_id: "",
        images: [],
        release_date: null,
        stock: "",
        availabilityStatus: true,
        categoryOptions: form.categoryOptions,
        branchOptions: form.branchOptions,
        selectedBranches: []
      });
      setSizes([{ size: "", is_available: true }]);
      setColors([{ color: "", is_available: true }]);
      setImagesFiles([]);
    } catch (err) {
      console.error(err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: 16 }}>
      <h1>Admin Dashboard — Add Product</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label>Title</label>
            <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />

            <label>Brand</label>
            <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />

            <label>Category</label>
            <select required value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
              <option value="">— select category —</option>
              {form.categoryOptions.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>

            <label>Price</label>
            <input type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />

            <label>Discount %</label>
            <input type="number" min="0" max="100" value={form.discount_percentage} onChange={e => setForm({ ...form, discount_percentage: e.target.value })} />

            <label>Discounted Price (calculated)</label>
            <input readOnly value={form.discounted_price} />

            <label>Stock</label>
            <input type="number" min="0" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />

            <label>Availability</label>
            <select value={form.availabilityStatus ? "true" : "false"} onChange={e => setForm({ ...form, availabilityStatus: e.target.value === "true" })}>
              <option value="true">Available</option>
              <option value="false">Not available</option>
            </select>
          </div>

          <div>
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={8} />

            <label>Images (multiple)</label>
            <input type="file" accept="image/*" multiple onChange={handleImagesChange} />

            <div style={{ marginTop: 8 }}>
              <label><strong>Choose branches (product will create branch subdocs)</strong></label>
              <div style={{ marginTop: 6 }}>
                <select
                  multiple
                  size={Math.min(6, form.branchOptions.length || 3)}
                  value={form.selectedBranches}
                  onChange={e => {
                    const opts = Array.from(e.target.selectedOptions).map(o => o.value);
                    // store selected branch names in state
                    setForm(f => ({ ...f, selectedBranches: opts }));
                  }}
                  style={{ width: '100%', minHeight: 80 }}
                >
                  {form.branchOptions.map(b => (
                    <option key={b.id} value={b.name ?? b.id}>{b.name ?? b.id}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <small>Release date will be set automatically on create (server timestamp)</small>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div style={{ marginTop: 12 }}>
          <h3>Sizes</h3>
          {sizes.map((s, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <input placeholder="Size (e.g. S, M, 42)" value={s.size} onChange={e => updateSize(idx, "size", e.target.value)} />
              <label>
                <input type="checkbox" checked={!!s.is_available} onChange={e => updateSize(idx, "is_available", e.target.checked)} />
                Available
              </label>
              <button type="button" onClick={() => removeSizeRow(idx)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addSizeRow}>Add size</button>
        </div>

        {/* Colors */}
        <div style={{ marginTop: 12 }}>
          <h3>Colors</h3>
          {colors.map((c, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <input placeholder="Color (e.g. Red)" value={c.color} onChange={e => updateColor(idx, "color", e.target.value)} />
              <label>
                <input type="checkbox" checked={!!c.is_available} onChange={e => updateColor(idx, "is_available", e.target.checked)} />
                Available
              </label>
              <button type="button" onClick={() => removeColorRow(idx)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addColorRow}>Add color</button>
        </div>

        <div style={{ marginTop: 16 }}>
          <button type="submit" disabled={loading}>{loading ? "Creating..." : "Add product"}</button>
        </div>

        {uploadProgress > 0 && <div style={{ marginTop: 8 }}>Upload progress: {uploadProgress}%</div>}
        {message && <div style={{ marginTop: 8, color: "green" }}>{message}</div>}
        {error && <div style={{ marginTop: 8, color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}
