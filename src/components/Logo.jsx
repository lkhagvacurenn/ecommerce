import React from 'react'
import { NavLink } from 'react-router-dom'
const Logo = () => {
  return (
    <NavLink to="/" className="hidden sm:flex flex-col w-fit text-black ">
          <h3 className="font-bold text-xl ">NEXTON</h3> 
          <p className="ml-auto text-[12px] ">eCommerce</p>
      </NavLink>
  )
}

export default Logo