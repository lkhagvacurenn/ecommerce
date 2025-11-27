import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";
import {FaStar, FaMinus,FaPlus} from 'react-icons/fa'
import Button from '../components/buttons/Button'
import Comment from "../components/Comment";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [orderCount,setOrderCount] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getProductById(id);
      setProduct(data);
    })();
  }, [id]);
  
  if (!product) return <div className="p-4">Loading...</div> ;
  const price = Number(product.price ?? 0);
  const discount = Number(product.discountPercentage ?? 0);
  const newPrice =  discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;
  const totalPrice =(price * orderCount).toFixed(2);
  const totalNewPrice = (newPrice * orderCount).toFixed(2);
  const saving = (totalPrice -totalNewPrice).toFixed(2);
  const count = product.reviews.length;
  const starTotal = product.reviews.reduce((acc, r) => acc + (r.rating ?? 0), 0);
  const avgStar = count ? (starTotal / count).toFixed(1) : "5.0";

  return (
    <div className="w-full">
        <div className="flex flex-col sm:flex-row gap-5 my-5 w-full">
            <div className="flex flex-col  sm:flex-row gap-1  items-start justify-center sm:justify-start w-full sm:w-[60%]">
                {product.images.length > 1 ? 
                <div className="flex sm:flex-col order-2 sm:order-1  sm:h-full gap-1 justify-between w-full sm:w-[20%] ">
                    {product.images.slice(0,3).map((image,i)=> (
                        <img onClick={()=>{setActiveImgIndex(i)}} className={` sm:h-1/3 object-contain p-1 w-[30%] sm:w-full border rounded-md ${activeImgIndex ===i ? 'border-primaryClr' :''}`} src={image} alt="image" key={i} />
                    ))}
                </div> : ''}
                <img className='w-full sm:w-[70%] order-1 sm:order-2 aspect-3/4  p-2 object-contain border rounded-md' src={product.images[activeImgIndex]} alt="product image" />
            </div>
            <div className="h-fit sm:w-[40%] flex flex-col gap-5 p-3 border border-boxBgClr rounded -md">
                <small className="flex justify-between items-start">
                    <p className="flex gap-1 items-center">                    
                        <FaStar className="fill-starClr"/> <span className="font-bold">{avgStar}</span><span className="underline">{count} reviews</span> 
                    </p>
                    <p className="flex flex-col items-end">
                        <span className="font-bold text-lg">${newPrice}</span>
                        <span className="line-through">${price}</span>
                    </p>
                </small>
                <small className="flex justify-between">
                    <div className="flex gap-2 items-center rounded-2xl py-1 px-3 bg-boxBgClr">
                        <button onClick={()=> setOrderCount(prev => prev-1)} className="rounded-[50%] bg-white p-1 disabled:opacity-30" disabled={orderCount === 1}>
                            <FaMinus className="fill-secondaryClr"/>
                        </button>
                        <span>{orderCount}</span>
                        <button onClick={()=> setOrderCount(prev => prev+1)} className="rounded-[50%] bg-white p-1 disabled:opacity-30" disabled={orderCount >= product.stock}>
                            <FaPlus className="fill-secondaryClr"/>
                        </button>
                    </div>
                    <Button>Add to Cart</Button>
                </small>
                <small>
                    <p className="flex justify-between">
                        <span>${price} x {orderCount}</span>
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
                    <li>Review Count: <span>{count}</span></li>
                    <li>Review Average: <span>{avgStar}</span></li>
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
