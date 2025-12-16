import { NavLink } from "react-router-dom";
import { FaRegUser, FaShoppingBasket } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { GiRolledCloth } from "react-icons/gi";
import SearchBox from "./SearchBox";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { useState } from "react";
const Header = () => {
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  let printCount ='';
  const { cart } = useCart();
  const count = cart?.items?.length || 0;
  if(count > 10)
    printCount = '10+';
  else printCount = count;
  return (
    <div className='sticky top-0 z-30 bg-white flex justify-between items-center py-5 gap-2 border-b-2 border-boxBgClr'>
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
          <NavLink to="/checkout" className='relative'>
              <FaShoppingBasket className="w-6 h-6"/>
              {count>0 ? <span className="absolute -top-1 left-2 bg-primaryClr text-white text-[12px] px-2 rounded-xl">{printCount}</span> :""}
          </NavLink>
      </div>

      {/*mobile menu */}
      <button className="block sm:hidden" onClick={()=> setmobileMenuOpen(true)}>
       <IoMenu className="text-2xl"/>
      </button>

      {mobileMenuOpen && 
      <div className="fixed top-0 left-0 w-screen h-screen bg-white">
          <button className="fixed top-5 right-5" onClick={()=> setmobileMenuOpen(false)}>
              <IoClose className="text-2xl"/>
          </button>
          <div className='mt-12 p-5'>
            <NavLink to="/profile" onClick={()=> setmobileMenuOpen(false)} className={({isActive}) => `flex gap-2  ${isActive ? "text-primaryClr" : "text-gray-700"}`}>
              <FaRegUser className="w-5 h-5"/> Profile
            </NavLink>
            <NavLink to="/checkout" onClick={() => setmobileMenuOpen(false)} className={({ isActive }) => `flex gap-2 transition-colors ${isActive ? "text-primaryClr" : "text-gray-700"}`}>            
                <FaShoppingBasket className="w-6 h-6"/> Checkout
            </NavLink>
            <NavLink to="/products" onClick={() => setmobileMenuOpen(false)} className={({ isActive }) => `flex gap-2 transition-colors ${isActive ? "text-primaryClr" : "text-gray-700"}`}>            
                <GiRolledCloth className="w-6 h-6"/> Products
            </NavLink>
              <img
              className="w-full aspect-auto rounded-full mt-10"
               src="https://www.shutterstock.com/image-vector/cute-kawaii-cat-illustration-adorable-600nw-2647492379.jpg" 
               alt="cute" 
               />
          </div>
          <NavLink to="/" onClick={() => setmobileMenuOpen(false)} className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col w-fit text-black ">
                      <h3 className="font-bold text-xl ">NEXTON</h3> 
                      <p className="ml-auto text-[12px] ">eCommerce</p>
          </NavLink>
      </div>
      }
      
    </div>
    
  )
}
export default Header;
