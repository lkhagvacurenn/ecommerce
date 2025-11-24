// src/contexts/ProductsContext.jsx
import { useSearchParams } from "react-router-dom";
import  {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getProducts,
  getCategories,
  getProductById,
  searchProducts,
  getProductsByCategory,
} from "../services/products";

const ProductContext = createContext(null);

function parseNumberOrNull(v) {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function ProductProvider({ children }) {
  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState([]); // all products (fetched once)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [catsLoading, setCatsLoading] = useState(false);

  // filters state: use numbers (null when not set) for numeric filters
  const [filters, setFilters] = useState(() => ({
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    priceMin: parseNumberOrNull(searchParams.get("priceMin")),
    priceMax: parseNumberOrNull(searchParams.get("priceMax")),
    ratingMin: parseNumberOrNull(searchParams.get("ratingMin")),
    sort: searchParams.get("sort") || "", // 'price-asc' | 'price-desc' | 'rating' | 'title-asc' | 'title-desc'
  }));

  // sync from URL -> filters (whenever URL changes)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const priceMin = parseNumberOrNull(searchParams.get("priceMin"));
    const priceMax = parseNumberOrNull(searchParams.get("priceMax"));
    const ratingMin = parseNumberOrNull(searchParams.get("ratingMin"));
    const sort = searchParams.get("sort") || "";

    setFilters((prev) => {
      if (
        prev.q === q &&
        prev.category === category &&
        prev.priceMin === priceMin &&
        prev.priceMax === priceMax &&
        prev.ratingMin === ratingMin &&
        prev.sort === sort
      ) {
        return prev;
      }
      return {
        ...prev,
        q,
        category,
        priceMin,
        priceMax,
        ratingMin,
        sort,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // fetch all products once
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts({ limit: 100, skip: 0 });
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

  // optional server helpers (kept)
  const serverSearch = useCallback(async (q) => {
    if (!q) return [];
    const res = await searchProducts(q);
    return Array.isArray(res.products) ? res.products : [];
  }, []);

  const serverCategoryFetch = useCallback(async (category) => {
    if (!category) return [];
    const res = await getProductsByCategory(category, );
    return Array.isArray(res.products) ? res.products : [];
  }, []);

  // client-side filtering + sorts (supports alphabetical)
  const filteredProducts = useMemo(() => {
    let out = Array.isArray(allProducts) ? allProducts.slice() : [];

    const { q, category, priceMin, priceMax, ratingMin, sort } = filters;

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

    if (priceMin != null) {
      out = out.filter((p) => Number(p.price ?? 0) >= priceMin);
    }
    if (priceMax != null) {
      out = out.filter((p) => Number(p.price ?? 0) <= priceMax);
    }
    if (ratingMin != null) {
      out = out.filter((p) => Number(p.rating ?? 0) >= ratingMin);
    }

    // sorts (including alphabet)
        // sorts (rating and newest added)
    if (sort) {
      if (sort === "price-asc") out.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      else if (sort === "price-desc") out.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      else if (sort === "rating") out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); // higher rating first
      else if (sort === "newest") out.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)); // newest by id desc
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
    [
      allProducts,
      filteredProducts,
      loading,
      error,
      filters,
      categories,
      catsLoading,
      serverSearch,
      serverCategoryFetch,
      fetchProductById,
    ]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export default ProductContext;
