import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductsContext";
import PriceRangeSlider from "./PriceRangeSlider";
import CategoryList from "./ui/CategoryList";

const SideBar = () => {
  const { filters, setFilters } = useContext(ProductContext);
  
  // local slider values (UI responsive)
  const [rangeValues, setRangeValues] = useState({
    min: filters.priceMin ?? 0,
    max: filters.priceMax ?? 10000,
  });

  const navigate = useNavigate();
  const debounceRef = useRef(null);

  // when user drags slider, update local UI state
  const handleRangeChange = (value) => {
    // value expected: { min, max }
    setRangeValues(value);

    // debounce commit to context + URL
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // commit into context filters (use the functional setter to avoid stale closure)
      setFilters((prev) => {
        const next = {
          ...prev,
          priceMin: value.min !== "" ? Number(value.min) : null,
          priceMax: value.max !== "" ? Number(value.max) : null,
        };

        // update URL to reflect changed filters
        const params = new URLSearchParams();
        if (next.q) params.set("q", next.q);
        if (next.category) params.set("category", next.category);
        if (next.sort) params.set("sort", next.sort);
        if (next.priceMin != null) params.set("priceMin", String(next.priceMin));
        if (next.priceMax != null) params.set("priceMax", String(next.priceMax));
        if (next.ratingMin != null) params.set("ratingMin", String(next.ratingMin));

        const qs = params.toString();
        navigate(qs ? `/products?${qs}` : "/products", { replace: false });

        return next;
      });

      debounceRef.current = null;
    }, 400); // 400ms debounce
  };

  // handle sort change: commit immediately
  const handleSortChange = (e) => {
    const sortVal = e.target.value || "";
    const nextFilters = {
      ...filters,
      sort: sortVal,
      // keep current local range values (they might be in-flight)
      priceMin: rangeValues.min !== "" ? Number(rangeValues.min) : null,
      priceMax: rangeValues.max !== "" ? Number(rangeValues.max) : null,
    };

    setFilters(nextFilters);

    const params = new URLSearchParams();
    if (nextFilters.q) params.set("q", nextFilters.q);
    if (nextFilters.category) params.set("category", nextFilters.category);
    if (nextFilters.sort) params.set("sort", nextFilters.sort);
    if (nextFilters.priceMin != null) params.set("priceMin", String(nextFilters.priceMin));
    if (nextFilters.priceMax != null) params.set("priceMax", String(nextFilters.priceMax));
    if (nextFilters.ratingMin != null) params.set("ratingMin", String(nextFilters.ratingMin));

    const qs = params.toString();
    navigate(qs ? `/products?${qs}` : "/products", { replace: false });
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);


  return (
    <div className="w-60">
      <CategoryList />

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <PriceRangeSlider
          min={0}
          max={10000}
          onChange={handleRangeChange}
          width="15rem"
          currencyText="$"
          step={50}
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
    </div>
  );
};

export default SideBar;
