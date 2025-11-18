import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState } from "react"
const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const val = e.target.value;
    setQuery(val);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    const qs = params.toString();
    navigate(qs ? `/products?${qs}` : '/products');
  };

  return (
        <form onSubmit={submitSearch} className="flex max-w-[400px] w-full items-center rounded-2xl gap-5 px-5 py-2 bg-boxBgClr">
            <FiSearch/>
            <input value={query} onChange={onChange} type="text" name="q" id="" placeholder="Search in products" className= "grow focus:outline-none bg-inherit" />
        </form> 
    )
}

export default SearchBox