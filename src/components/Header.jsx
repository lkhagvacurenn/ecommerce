import { NavLink } from "react-router-dom";
import SearchBox from "./SearchBox";
const Header = () => {
  return (
    <div className='flex justify-between items-center py-3 gap-5 border-b border-slate-200'>
      {/*mobile logo */}
      <NavLink to="/" className="block sm:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_278_2172)">
          <circle cx="12" cy="12" r="12" fill="#111827"/>
          <circle cx="12" cy="12" r="8" fill="white"/>
          <circle cx="12" cy="12" r="4" fill="#111827"/>
          </g>
          <defs>
          <clipPath id="clip0_278_2172">
          <rect width="24" height="24" fill="white"/>
          </clipPath>
          </defs>
          </svg>
      </NavLink>

      {/* desktop logo */}
      <NavLink to="/" className="hidden sm:flex flex-col w-fit text-black ">
          <h3 className="font-bold text-xl ">NEXTON</h3> 
          <p className="ml-auto text-[12px] ">eCommerce</p>
      </NavLink>

      <SearchBox/>

      {/*desktop menu contains avatar and basket */}
      <div className='hidden sm:flex justify-content items-center gap-5 '>
          <NavLink to="/profile">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
          </NavLink>
          <NavLink to="/orders">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001" stroke="#4B5563" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z" stroke="#4B5563" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z" stroke="#4B5563" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 8H21" stroke="#4B5563" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </NavLink>
      </div>

      {/*mobile menu */}
      <button className="block sm:hidden">
        <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="16" height="2" rx="1" fill="#4B5563"/>
        <rect x="8" y="13" width="16" height="2" rx="1" fill="#4B5563"/>
        <rect x="8" y="18" width="16" height="2" rx="1" fill="#4B5563"/>
        </svg>
      </button>
      
    </div>
  )
}
export default Header;
