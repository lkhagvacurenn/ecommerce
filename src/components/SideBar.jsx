import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PriceRangeSlider from "./PriceRangeSlider";
import CategoryList from "./ui/CategoryList";
import { getAllProducts } from "../services/api";

const parseNumberOrNull = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

const SideBar = ({ onResults }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  // read initial filters from url
  const initialFilters = {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || null,
    sort: searchParams.get("sort") || "",
    priceMin: parseNumberOrNull(searchParams.get("priceMin")),
    priceMax: parseNumberOrNull(searchParams.get("priceMax")),
    ratingMin: parseNumberOrNull(searchParams.get("ratingMin")),
    page: parseNumberOrNull(searchParams.get("page")) ?? 1,
    limit: parseNumberOrNull(searchParams.get("limit")) ?? 20,
  };

  // Central filter state used to compose queries and reflect UI
  const [filters, setFilters] = useState(initialFilters);

  // local slider UI state (so dragging is smooth)
  const [rangeValues, setRangeValues] = useState({
    min: filters.priceMin ?? 0,
    max: filters.priceMax ?? 500,
  });

  // results metadata (optional: used to show count)
  const [resultsTotal, setResultsTotal] = useState(null);

  // sync URL -> state if user navigates with back/forward
  useEffect(() => {
    const subFilters = {
      q: searchParams.get("q") || "",
      category: searchParams.get("category") || null,
      sort: searchParams.get("sort") || "",
      priceMin: parseNumberOrNull(searchParams.get("priceMin")),
      priceMax: parseNumberOrNull(searchParams.get("priceMax")),
      ratingMin: parseNumberOrNull(searchParams.get("ratingMin")),
      page: parseNumberOrNull(searchParams.get("page")) ?? 1,
      limit: parseNumberOrNull(searchParams.get("limit")) ?? 20,
    };
    setFilters(subFilters);
    setRangeValues({
      min: subFilters.priceMin ?? 0,
      max: subFilters.priceMax ?? 10000,
    });
  }, [searchParams]);

  // whenever filters change, call backend to fetch results (so we can show total)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // build params accepted by your getAllProducts
        const params = {};
        if (filters.q) params.q = filters.q;
        if (filters.category) params.category = filters.category;
        if (filters.priceMin != null) params.minPrice = filters.priceMin;
        if (filters.priceMax != null) params.maxPrice = filters.priceMax;
        if (filters.page) params.page = filters.page;
        if (filters.limit) params.limit = filters.limit;
        if (filters.sort) {
          // translate friendly sort values to backend sortBy field if needed
          // e.g. "price-asc" -> "price", "price-desc" -> "-price"
          if (filters.sort === "price-asc") params.sortBy = "price";
          else if (filters.sort === "price-desc") params.sortBy = "-price";
          else if (filters.sort === "rating") params.sortBy = "-newPrice"; // example; change if you have rating field
          else if (filters.sort === "newest") params.sortBy = "-createdAt";
          else params.sortBy = filters.sort;
        }

        const res = await getAllProducts(params);
        if (!mounted) return;
        if (res && res.success && res.data) {
          // your getAllProducts returns { success, data } or { success, data: { items, total, page, limit } }
          // handle both shapes gracefully:
          if (Array.isArray(res.data)) {
            setResultsTotal(res.data.length);
            if (typeof onResults === "function") onResults({ total: res.data.length, items: res.data });
          } else {
            // expecting { items, total, page, limit } from controller
            setResultsTotal(res.data.total ?? (res.data.items ? res.data.items.length : null));
            if (typeof onResults === "function") onResults(res.data);
          }
        } else {
          setResultsTotal(0);
          if (typeof onResults === "function") onResults({ total: 0, items: [] });
        }
      } catch (err) {
        console.error("Failed to load products for filters", err);
        setResultsTotal(0);
      }
    })();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]); // re-run when filters object changes

  // helper: commit filters to URL
  const commitFiltersToUrl = (nextFilters) => {
    const params = new URLSearchParams();
    if (nextFilters.q) params.set("q", nextFilters.q);
    if (nextFilters.category) params.set("category", nextFilters.category);
    if (nextFilters.sort) params.set("sort", nextFilters.sort);
    if (nextFilters.priceMin != null) params.set("priceMin", String(nextFilters.priceMin));
    if (nextFilters.priceMax != null) params.set("priceMax", String(nextFilters.priceMax));
    if (nextFilters.ratingMin != null) params.set("ratingMin", String(nextFilters.ratingMin));
    if (nextFilters.page) params.set("page", String(nextFilters.page));
    if (nextFilters.limit) params.set("limit", String(nextFilters.limit));

    const qs = params.toString();
    // update the browser URL (will also update searchParams -> state via effect above)
    navigate(qs ? `/products?${qs}` : "/products", { replace: false });
    // also apply to search params directly to make them available immediately
    setSearchParams(params);
  };

  // when user drags slider: update only local UI and debounce committing to URL/state
  const handleRangeChange = (value) => {
    // value expected: { min, max }
    setRangeValues(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // commit into filters state (functional setter)
      setFilters((prev) => {
        const next = {
          ...prev,
          priceMin: value.min !== "" ? Number(value.min) : null,
          priceMax: value.max !== "" ? Number(value.max) : null,
          page: 1 // reset page when filters change
        };
        commitFiltersToUrl(next);
        return next;
      });
      debounceRef.current = null;
    }, 400);
  };

  // sort changes commit immediately
  const handleSortChange = (e) => {
    const sortVal = e.target.value || "";
    const nextFilters = {
      ...filters,
      sort: sortVal,
      priceMin: rangeValues.min !== "" ? Number(rangeValues.min) : null,
      priceMax: rangeValues.max !== "" ? Number(rangeValues.max) : null,
      page: 1
    };
    setFilters(nextFilters);
    commitFiltersToUrl(nextFilters);
  };

  // category selection handler (CategoryList should call this with the selected category id or slug)
  const handleSelectCategory = (categoryIdOrSlug) => {
    const nextFilters = {
      ...filters,
      category: categoryIdOrSlug || null,
      page: 1
    };
    setFilters(nextFilters);
    commitFiltersToUrl(nextFilters);
  };

  // cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);


  return (
    <aside className="w-60">
      <CategoryList onSelect={handleSelectCategory} selected={filters.category} />

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <PriceRangeSlider
          min={0}
          max={500}
          onChange={handleRangeChange}
          width="15rem"
          currencyText="$"
          step={10}
          value={rangeValues}
        />
      </div>

      <form className="mt-5 border-t border-slate-200 pt-4">
        <h2 className="font-bold text-xl mb-2">Sort</h2>
        <div className="space-y-1 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="price-asc"
              checked={filters.sort === "price-asc"}
              onChange={handleSortChange}
            />
            Price Low–High
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="price-desc"
              checked={filters.sort === "price-desc"}
              onChange={handleSortChange}
            />
            Price High–Low
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="rating"
              checked={filters.sort === "rating"}
              onChange={handleSortChange}
            />
            Best Rating
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="newest"
              checked={filters.sort === "newest"}
              onChange={handleSortChange}
            />
            Newest
          </label>
        </div>
      </form>
    </aside>
  );
};

export default SideBar;
