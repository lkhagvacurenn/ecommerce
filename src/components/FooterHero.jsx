import React from 'react'
import ShopNowBtn from './buttons/ShopNowBtn'
const FooterHero = () => {
  return (
    <div className='w-full max-h-[300px] rounded-md  pl-5 hidden sm:flex justify-center items-center bg-[#F5F5F5]'>
        <div>
            <p>100% Original Products</p>
            <p className='font-bold text-2xl'>The All New Fashion Collection Items</p>
            <p className='mb-3'>Starting from: $59.99</p>
            <ShopNowBtn className='mt-5'/>
        </div>
        <img className='w-[300px] object-contain'  src="../../public/hero/footerHero.jpg" alt="footerHero" />
    </div>
  )
}

export default FooterHero