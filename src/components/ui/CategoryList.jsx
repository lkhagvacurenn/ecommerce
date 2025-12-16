// components/ui/CategoryList.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllCategories } from "../../services/api";

/**
 * Props:
 * - onSelect(categoryIdOrSlug) optional callback when user selects category
 * - selected - optional currently selected category id/slug (preferred)
 */
const CategoryList = ({ onSelect, selected }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);

  // load categories from API
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getAllCategories();
        if (!mounted) return;

        // handle various shapes: { success, data: [...] } or direct array
        const data = res && res.success ? res.data : res;
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
          console.warn("Unexpected categories shape:", data);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // compute currently selected category (from prop first, then URL)
  const selectedFromUrl = searchParams.get("category") || "";
  const active = selected ?? selectedFromUrl;

  // when user changes category, preserve other query params
  const handleChange = (value) => {
    // call callback if provided
    if (typeof onSelect === "function") onSelect(value || null);

    // preserve all existing params except replace 'category'
    const params = new URLSearchParams(Array.from(searchParams.entries()).filter(([k]) => k !== "category"));

    if (value) params.set("category", value);
    const qs = params.toString();
    navigate(qs ? `/products?${qs}` : "/products", { replace: false });
  };

  return (
    <div>
      <h2 className="font-bold text-xl mb-2">Categories</h2>
      <ul className="space-y-2">
        <li key="all">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="category"
              value=""
              onChange={() => handleChange("")}
              checked={!active}
            />
            <span>All</span>
          </label>
        </li>

        {categories.map((c) => {
          // normalize shape: support either string or object { id, slug, name }
          const slug = typeof c === "string" ? c : (c.slug || c.id || c._id || "");
          const name = typeof c === "string" ? c : (c.name || slug);
          return (
            <li key={slug}>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  onChange={() => handleChange(slug)}
                  value={slug}
                  checked={String(active) === String(slug)}
                />
                <span>{name}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
