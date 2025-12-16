import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { getAllCategories, createProduct } from "../../services/api";

const AdminAddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPercent: 0,
    category: "",
    brand: "",
    sizes: "",
    colors: "",
    images: "",
    stock: ""
  });

  useEffect(() => {
    (async () => {
      const res = await getAllCategories();
      if (res.success) setCategories(res.data);
    })();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      discountPercent: Number(form.discountPercent),
      sizes: form.sizes.split(",").map(s => s.trim()),
      colors: form.colors.split(",").map(c => c.trim()),
      images: form.images.split(",").map(i => i.trim())
    };

    const token = localStorage.getItem("token");
    const res = await createProduct(token, payload);

    if (res.success) {
      alert("✅ Product added");
      setForm({
        title: "",
        description: "",
        price: "",
        discountPercent: 0,
        category: "",
        brand: "",
        sizes: "",
        colors: "",
        images: "",
        stock: ""
      });
    } else {
      alert(res.message || "Failed");
    }

    setLoading(false);
  }

  const fieldClass =
    "w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryClr";

  const labelClass = "text-sm font-semibold text-slate-700 mb-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full bg-white p-6 rounded-2xl shadow flex flex-col gap-5"
    >
      <h2 className="text-2xl font-bold mb-2">Add New Product</h2>

      {/* Title */}
      <div className="flex flex-col">
        <label className={labelClass}>Product Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={fieldClass}
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className={`${fieldClass} min-h-[100px]`}
          required
        />
      </div>

      {/* Price & Discount */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className={labelClass}>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className={fieldClass}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Discount (%)</label>
          <input
            type="number"
            name="discountPercent"
            value={form.discountPercent}
            max='100'
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className={labelClass}>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={fieldClass}
          required
        >
          <option value="">Select category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div className="flex flex-col">
        <label className={labelClass}>Brand</label>
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>

      {/* Sizes */}
      <div className="flex flex-col">
        <label className={labelClass}>Sizes (comma separated)</label>
        <input
          name="sizes"
          placeholder="S, M, L, XL"
          value={form.sizes}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>

      {/* Colors */}
      <div className="flex flex-col">
        <label className={labelClass}>Colors (comma separated)</label>
        <input
          name="colors"
          placeholder="Black, White"
          value={form.colors}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>

      {/* Images */}
      <div className="flex flex-col">
        <label className={labelClass}>Image URLs (comma separated)</label>
        <input
          name="images"
          placeholder="https://img1, https://img2"
          value={form.images}
          onChange={handleChange}
          className={fieldClass}
        />
      </div>

      {/* Stock */}
      <div className="flex flex-col">
        <label className={labelClass}>Stock</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className={fieldClass}
          required
        />
      </div>

      <Button type="submit" disabled={loading} width="full">
        {loading ? "Saving..." : "Add Product"}
      </Button>
    </form>
  );
};

export default AdminAddProduct;
