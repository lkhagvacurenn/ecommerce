import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
//import FavContext from "../context/FavContext";
import ProductContext from "../context/ProductsContext";
import {FaStar} from 'react-icons/fa'
import Button from '../components/buttons/Button'
import Comment from "../components/Comment";
import ProductThumbnail from "../components/ProductThumbnail";
import Counter from "../components/Counter";
import { calculatePrice } from "../utils/CalculatePrice";

const Product = () => {
  const { id } = useParams();
  const [product,setProduct] = useState(null);
  const {fetchProductById} =useContext(ProductContext);
 // const {toggleFav}= useContext(FavContext);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [orderCount,setOrderCount] = useState(1);
  useEffect(()=> {
    (async ()=> {
        try{
        const data = await fetchProductById(id);
        setProduct(data);
        } catch(err) {
            console.error(err)
        }
    })()
  },[id,fetchProductById,])
  
  function handleClick(delta,e){
        e.stopPropagation();
        setOrderCount(prev => prev+delta)
  }
  if (!product) return <div className="p-4">Loading...</div> ;
  const {
    newPrice,
    totalPrice,
    totalNewPrice,
    saving
  } = calculatePrice(product.price,product.discountPercentage,orderCount);

  return (
    <div className="w-full">
        <div className="flex flex-col sm:flex-row gap-5 my-5 w-full">
            <div className="flex flex-col  sm:flex-row gap-1  items-start justify-center sm:justify-start w-full sm:w-[60%]">
                {product.images.length > 1 ? 
                <div className="flex sm:flex-col order-2 sm:order-1  sm:h-full gap-1 justify-start w-full sm:w-[20%] ">
                    {product.images.slice(0,3).map((image,i)=> (
                        <img onClick={()=>{setActiveImgIndex(i)}} className={` sm:h-1/3 object-contain p-1 w-[30%] sm:w-full border rounded-md ${activeImgIndex ===i ? 'border-primaryClr' :''}`} src={image} alt="image" key={i} />
                    ))}
                </div> : ''}
                <div className="relative w-full sm:w-[70%] order-1 sm:order-2 aspect-3/4  p-2 border rounded-md">
                    <ProductThumbnail img={product.images[activeImgIndex]} id={product.id}/>  
                </div>
            </div>
            <div className="h-fit sm:w-[40%] flex flex-col gap-5 p-3 border border-boxBgClr rounded -md">
                <small className="flex justify-between items-start">
                    <p className="flex gap-1 items-center">                                           
                         <FaStar className="fill-starClr"/> 
                         <span className="font-bold">{product.rating}</span>
                         <span className="underline">{product.reviews.length} reviews</span> 
                    </p>
                    <p className="flex flex-col items-end">
                        <span className="font-bold text-lg">${newPrice}</span>
                        <span className="line-through">${product.price}</span>
                    </p>
                </small>
                <small className="flex justify-between">
                    <Counter key={product.id} orderCount={orderCount} onClick={handleClick} stock={product.stock}/>
                    <Button>Add to Cart</Button>
                </small>
                <small>
                    <p className="flex justify-between">
                        <span>${product.price} x {orderCount}</span>
                        <span>${totalPrice}</span>
                    </p>
                     <p className="flex justify-between items-center text-red-500">
                        <span>You saving</span>
                        <span>${saving}</span>
                    </p>
                    <p className="flex justify-between mt-2 items-center border-t-2">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-md">${totalNewPrice}</span>
                    </p>
                </small>
            </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between gap-5">
           <div className="border-t-2 border-boxBgClr sm:w-[60%]">
                <h1 className="font-bold text-lg">{product.title}</h1>
                <p className="text-justify text-sm">{product.description}</p>
                <h2 className=" mt-3 font-bold">About</h2>
                <ul className="text-sm">
                    <li>Brand: <span>{product.brand}</span></li>
                    <li>Warranty: <span>{product.warrantyInformation}</span></li>
                    <li>Shipping: <span>{product.shippingInformation}</span></li>
                </ul>
                <h2 className=" mt-3 font-bold">Sale performance</h2>
                <ul className="text-sm">
                    <li>Stock: <span>{product.stock || 0}</span></li>
                    <li>Review Count: <span>{product.reviews.length}</span></li>
                    <li>Review Average: <span>{product.rating}</span></li>
                </ul>
            </div> 
            <ul className="sm:w-[40%] border-t-2 p-2">
                <h2 className="font-bold text-lg">Reviews</h2>
                {product.reviews.slice(0,3).map((review,i) => (
                    <Comment key={i} review={review}/>
                ))}
            </ul>
        </div>
        
    </div>
  );
};

export default Product;
