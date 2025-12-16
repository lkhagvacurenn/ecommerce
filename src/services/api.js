// src/api/index.js
export const API_BASE = "http://localhost:5000/api";

// ---- helpers ----
const getToken = (token) => token || localStorage.getItem("token") || null;

const handleRes = async (res) => {
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    return { success: false, message: (data && data.message) || res.statusText || "Request failed", data };
  }
  return { success: true, data };
};

// ---- AUTH ----
export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const result = await handleRes(res);
    if (!result.success) return result;

    // backend returns { token, user } per our design
    const { token, user } = result.data || {};
    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return { success: true, data: { token, user }, message: "Registration successful" };
  } catch (err) {
    return { success: false, message: err.message || "Registration failed" };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const result = await handleRes(res);
    if (!result.success) return result;

    const { token, user } = result.data || {};
    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return { success: true, data: { token, user }, message: "Login successful" };
  } catch (err) {
    return { success: false, message: err.message || "Login failed" };
  }
};

export const getAccountInfo = async (tokenParam) => {
  try {
    const token = getToken(tokenParam);
    if (!token) return { success: false, message: "No token provided" };

    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const result = await handleRes(res);
    if (!result.success) return result;
    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch account info" };
  }
};

// ---- CATEGORIES ----
// NOTE: backend earlier expected slug + name; adapt here as needed.
// If your backend create expects { slug, name, description, thumbnail } change payload accordingly.
export const getAllCategories = async () => {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch categories" };
  }
};

export const createCategory = async (tokenParam, { slug, name, description, thumbnail }) => {
  try {
    const token = getToken(tokenParam);
    const res = await fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ slug, name, description, thumbnail })
    });
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to create category" };
  }
};

// ---- PRODUCTS ----
export const getAllProducts = async (params = {}) => {
  try {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== "") qs.set(k, String(v)); });
    const url = `${API_BASE}/products${qs.toString() ? "?" + qs.toString() : ""}`;
    const res = await fetch(url);
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch products" };
  }
};

// get product by id

export const getProduct = async (productId) => {
  try {
    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(productId)}`);
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch product" };
  }
};

// Create product: backend expects title, description, price, category (ObjectId), sizes, colors, images, stock
export const createProduct = async (tokenParam, productPayload) => {
  try {
    const token = getToken(tokenParam);
    // If you're sending images as FormData, handle separately (FormData automatically sets headers)
    const res = await fetch(`${API_BASE}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(productPayload)
    });
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to create product" };
  }
};

// ---- REVIEWS ----
// createReview requires method, headers and probably auth if protected
export const createReview = async ({ productID, rating, comment }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/reviews/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ productID, rating, comment })
    });

    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message };
  }
};


export const getReviewsByProduct = async (productId) => {
  try {
    const res = await fetch(`${API_BASE}/reviews/by-product?productID=${encodeURIComponent(productId)}`);
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch reviews" };
  }
};

// ---- CART helpers (examples) ----
export const getCart = async (tokenParam) => {
  try {
    const token = getToken(tokenParam);
    const res = await fetch(`${API_BASE}/cart`, {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
    });
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to get cart" };
  }
};

export const getCartProduct = async (tokenParam,productId) => {
  try {
    const token = getToken(tokenParam);
    const res = await fetch(`${API_BASE}/cart/product?productID=${encodeURIComponent(productId)}`, {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
    });
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch reviews" };
  }
};

export const addItemToCart = async (tokenParam, { productID, qty = 1 }) => {
  try {
    const token = getToken(tokenParam);
    const res = await fetch(`${API_BASE}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ productID, qty })
    });
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to add item to cart" };
  }
};

export const updateCartItem = async (tokenParam, {productID,qty}) => {
try {
    const token = getToken(tokenParam);
    const res = await fetch(`${API_BASE}/cart/items`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ productID, qty })
    });
    return handleRes(res);
  } catch (err) {
    return { success: false, message: err.message || "Failed to add item to cart" };
  }}

  export const deleteCartItem = async (tokenParam, productID) => {
    try {
        const token = getToken(tokenParam);
        const res = await fetch(`${API_BASE}/cart/items/${encodeURIComponent(productID)}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        });
        return handleRes(res);
    } catch (err) {
        return { success: false, message: err.message || "Failed to delete item to cart" };
    }}

  export const checkout = async(tokenParam) =>{
    try{
      const token = getToken(tokenParam);
      const res = await fetch(`${API_BASE}/cart/checkout`,{
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      return handleRes(res);
    } catch (err) {
        return { success: false, message: err.message || "Failed to delete item to cart" };
    }
  }

    export const getCompletedOrders = async(tokenParam) =>{
    try{
      const token = getToken(tokenParam);
      const res = await fetch(`${API_BASE}/cart/completed-orders`,{
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      });
      return handleRes(res);
    } catch (err) {
        return { success: false, message: err.message || "Failed to delete item to cart" };
    }
  }