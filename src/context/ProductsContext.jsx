// src/contexts/ProductsContext.jsx
import { useSearchParams } from "react-router-dom";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getProducts, getCategories, getProductById, searchProducts, getProductsByCategory } from "../services/products";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]); // all products (fetched once)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [catsLoading, setCatsLoading] = useState(false);

  // filters state (UI updates this)
  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    category: "",
    priceMin: "",
    priceMax: "",
    ratingMin: "",
    sort: "", // 'price-asc' | 'price-desc' | 'rating'
  });

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setFilters((prev) => {
      // avoid unnecessary setState if same
      if (prev.q === q) return prev;
      return { ...prev, q };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // fetch ALL products once (cheap for DummyJSON ~100 items)
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // fetch all (set high limit to get all items)
        const data = await getProducts({ limit: 200, skip: 0 });
        if (!mounted) return;
        setAllProducts(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // fetch categories once
  useEffect(() => {
    let mounted = true;
    (async () => {
      setCatsLoading(true);
      try {
        const cats = await getCategories();
        if (!mounted) return;
        setCategories(Array.isArray(cats) ? cats : []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setCatsLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // optional server-side search helper (if you prefer calling API for every search)
  const serverSearch = useCallback(async (q) => {
    if (!q) return [];
    const res = await searchProducts(q, { limit: 5 });
    return Array.isArray(res.products) ? res.products : [];
  }, []);

  // optional server-side category fetch helper
  const serverCategoryFetch = useCallback(async (category) => {
    if (!category) return [];
    const res = await getProductsByCategory(category, { limit: 5 });
    return Array.isArray(res.products) ? res.products : [];
  }, []);

  // filter logic (client-side)
  const filteredProducts = useMemo(() => {
    let out = Array.isArray(allProducts) ? allProducts.slice() : [];

    const { q, category, priceMin, priceMax, ratingMin, sort } = filters;

    // If you want server-search for performance you can uncomment below:
    // if (q) return serverSearch(q); // note: serverSearch returns a Promise -> then handle differently

    if (q) {
      const low = String(q).toLowerCase();
      out = out.filter(
        (p) =>
          String(p.title || "").toLowerCase().includes(low) ||
          String(p.description || "").toLowerCase().includes(low)
      );
    }

    if (category) {
      out = out.filter((p) => String(p.category) === String(category));
    }

    if (priceMin !== "" && priceMin != null) {
      out = out.filter((p) => Number(p.price ?? 0) >= Number(priceMin));
    }
    if (priceMax !== "" && priceMax != null) {
      out = out.filter((p) => Number(p.price ?? 0) <= Number(priceMax));
    }
    if (ratingMin !== "" && ratingMin != null) {
      out = out.filter((p) => Number(p.rating ?? 0) >= Number(ratingMin));
    }

    if (sort) {
      if (sort === "price-asc") out.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      else if (sort === "price-desc") out.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      else if (sort === "rating") out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return out;
  }, [allProducts, filters]);

  const fetchProductById = useCallback(async (id) => {
    if (!id) return null;
    try {
      const p = await getProductById(id);
      return p;
    } catch (err) {
      console.error("fetchProductById", err);
      return null;
    }
  }, []);

  const value = useMemo(
    () => ({
      allProducts,
      filteredProducts,
      loading,
      error,
      filters,
      setFilters,

      // categories
      categories,
      catsLoading,

      // helpers
      serverSearch,
      serverCategoryFetch,
      fetchProductById,
    }),
    [allProducts, filteredProducts, loading, error, filters, categories, catsLoading, serverSearch, serverCategoryFetch, fetchProductById]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export default ProductContext;