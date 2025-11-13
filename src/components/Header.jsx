import { NavLink } from "react-router-dom";
import { FaRegUser, FaShoppingBasket } from "react-icons/fa";
import SearchBox from "./SearchBox";
import Logo from "./Logo";
const Header = () => {
  return (
    <div className='sticky top-0 z-50 bg-white flex justify-between items-center py-5 gap-2 border-b-2 border-boxBgClr'>
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
      <Logo/>
      
      <SearchBox/>

      {/*desktop menu contains avatar and basket */}
      <div className='hidden sm:flex justify-content items-center gap-5 '>
          <NavLink to="/profile" className={({isActive}) => isActive ? "text-primaryClr" : ""}>
            <FaRegUser className="w-5 h-5"/>
          </NavLink>
          <NavLink to="/checkout" className={({isActive}) => isActive ? "text-primaryClr" : ""}>
              <FaShoppingBasket className="w-6 h-6"/>
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
