import { useState,  } from "react"
const SearchBox = () => {
    const [query, setQuery] = useState("");

  const onChange = (e) => {
    const val = e.target.value;
    setQuery(val);
  };

  return (
        <div className="flex max-w-[400px] w-full items-center rounded-2xl gap-5 px-5 py-2 bg-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#596780" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 22L20 20" stroke="#596780" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input value={query} onChange={onChange} type="text" name="" id="" placeholder="Search in products" className= "grow focus:outline-none bg-inherit" />
            {query && (
              <button onClick={() => { setQuery("");}} className="  px-1 rounded-3xl bg-gray-400 hover:bg-gray-500 hover:scale-110 transition-transform  text-white">
                ✕
              </button>
            )}
        </div> 
    )
}

export default SearchBox