import React from 'react'
import LikeBtn from './buttons/LikeBtn'

const ProductThumbnail = ({img,id}) => {
  return (
        <>
            <div className="absolute top-2 right-2 z-10">
                <LikeBtn id={id} />
            </div>            
            <img className=" w-full object-contain " src={img} alt="d.title"/>
        </>  
)
}

export default ProductThumbnail