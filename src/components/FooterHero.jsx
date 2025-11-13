import React from 'react'
import Button from './buttons/Button'
import { useNavigate } from 'react-router'
const FooterHero = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full max-h-[300px] rounded-md  pl-5 hidden sm:flex justify-center items-center bg-[#F5F5F5]'>
        <div>
            <p>100% Original Products</p>
            <p className='font-bold text-2xl'>The All New Fashion Collection Items</p>
            <p className='mb-3'>Starting from: $59.99</p>
            <Button onClick={()=> navigate("/products")}>Shop Now</Button>
        </div>
        <img className='w-[300px] object-contain'  src="../../public/hero/footerHero.jpg" alt="footerHero" />
    </div>
  )
}

export default FooterHero