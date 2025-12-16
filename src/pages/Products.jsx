import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Pagination from "../components/Pagination";
import { getAllProducts } from "../services/api";

const parseNumber = (v, fallback = undefined) => {
  if (v == null || v === "") return fallback;
  const n = Number(v);
  return Number.isNaN(n) ? fallback : n;
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);      // product items
  const [total, setTotal] = useState(0);       // total count (if available)
  const [page, setPage] = useState(1);         // current page
  const [limit, setLimit] = useState(null);      // page size
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build params object for API from the URL search params
  const buildParamsFromSearch = () => {
    const q = searchParams.get("q") || undefined;
    const category = searchParams.get("category") || undefined;
    // Controller expects minPrice / maxPrice
    const minPrice = parseNumber(searchParams.get("priceMin"));
    const maxPrice = parseNumber(searchParams.get("priceMax"));
    const sortByQuery = searchParams.get("sort") || undefined;

    // Map friendly sort names to backend sortBy if you used friendly names
    let sortBy;
    if (sortByQuery === "price-asc") sortBy = "price";
    else if (sortByQuery === "price-desc") sortBy = "-price";
    else if (sortByQuery === "newest") sortBy = "-createdAt";
    else if (sortByQuery === "rating") sortBy = "-newPrice"; // change if you have rating field
    else sortBy = sortByQuery;

    const pageParam = parseNumber(searchParams.get("page"), 1);
    const limitParam = parseNumber(searchParams.get("limit"), null);

    return {
      q,
      category,
      minPrice,
      maxPrice,
      page: pageParam,
      limit: limitParam,
      sortBy,
    };
  };

  // Fetch products whenever the querystring changes
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const params = buildParamsFromSearch();
        const res = await getAllProducts(params);

        if (!mounted) return;
        if (!res || !res.success) {
          setItems([]);
          setTotal(0);
          setError(res?.message || "Failed to fetch products");
        } else {
          // Handle both shapes:
          // 1) res.data = array
          // 2) res.data = { items, total, page, limit }
          if (Array.isArray(res.data)) {
            setItems(res.data);
            setTotal(res.data.length);
            setPage(params.page || 1);
            setLimit(params.limit || 20);
          } else if (res.data && typeof res.data === "object") {
            const d = res.data;
            setItems(Array.isArray(d.items) ? d.items : []);
            setTotal(d.total ?? (Array.isArray(d.items) ? d.items.length : 0));
            setPage(d.page ?? params.page ?? 1);
            setLimit(d.limit ?? params.limit ?? 20);
          } else {
            setItems([]);
            setTotal(0);
          }
        }
      } catch (err) {
        if (!mounted) return;
        console.error("getAllProducts error", err);
        setError(err.message || "Failed to fetch products");
        setItems([]);
        setTotal(0);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // re-run when the full querystring changes
  }, [searchParams.toString()]);

  // Called when Pagination component wants to change page
  const handlePageChange = (nextPage) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()).filter(([k]) => k !== "page"));
    params.set("page", String(nextPage));
    navigate(`/products?${params.toString()}`);
  };

  if (loading) {
    return <div className="w-60 h-60 animate-pulse m-auto mt-10">Loading...</div>;
  }

  return (
    <div className="sm:flex my-5">
      <div className="hidden sm:block">
        <SideBar />
      </div>

      <div className="flex-1">
        { (error|| items.length === 0) && <div className="p-4 text-red-600">Бүтээгдэхүүн олдсонгүй.</div>}

        <div className="mt-6">
          <Pagination
            products={items}
            page={page}
            limit={limit}
            total={total}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
