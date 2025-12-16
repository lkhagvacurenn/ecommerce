import React from 'react'
import LikeBtn from './buttons/LikeBtn'

const ProductThumbnail = ({img,id,discount,stock}) => {
  return (
        <>
            {stock===0 && 
            <div className='absolute top-0 z-10 w-full h-full'>
                <div className='absolute top-0 z-10 w-full h-full bg-black opacity-30'></div>
                <p className='absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>Out of stock</p>
            </div>
            }
            <div className="absolute top-2 right-1 z-10">
                <LikeBtn id={id} />
            </div> 
            { discount > 0 &&
                <div className="absolute bottom-0 left-0 z-10 bg-red-500 text-white text-xs px-2 py-1 ">
                    {discount}% OFF
                </div>
            }           
            <img className=" w-full h-full object-cover" src={img} alt="d.title"/>
        </>  
)
}

export default ProductThumbnail