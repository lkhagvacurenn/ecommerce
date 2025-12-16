import { useNavigate } from 'react-router-dom';
import {FaStar} from 'react-icons/fa'
import ProductThumbnail from './ProductThumbnail';
import { useEffect,useState } from 'react';
import { getReviewsByProduct } from '../services/api';
const ProductCard = ({d}) => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(0);
    useEffect(()=>{
        (async()=>{
            const res = await getReviewsByProduct(d.id);
            console.log(res);
            if(res.success){
                res.data.length === 0 ? setReviews({avgRating: 5, length: 0}) : setReviews(res.data);
            }
        })();
    }, [d.id]);
  return (
    <div onClick={()=> navigate(`/products/${d.id}`)} className="bg-white w-60 p-2 mx-auto">
        <div className='relative flex justify-center w-full h-60  rounded-md bg-boxBgClr overflow-hidden mb-2'>
            <ProductThumbnail img={d.images[0]} id={d.id} discount={d.discountPercent} stock={d.stock} width='full'/>
        </div>
        <article className="">
            <div className="flex justify-between text-[14px] gap-1">
                <p className="flex flex-col w-full max-w-[70%]">
                    <strong className="font-bold truncate ">
                        {d.title}
                    </strong>
                    <span className="text-spanClr">
                        {d.category.name}
                    </span>
                </p>
                <p className="flex flex-col items-end">
                    <strong>
                        ${d.newPrice}
                    </strong>
                    {d.discountPercent > 0 && (
                        <span className="text-spanClr line-through">
                            ${d.price}
                        </span>
                    )}
                </p>
            </div>
            <div className="flex gap-1 items-center text-sm">
                <p>{reviews.avgRating}</p>
                <FaStar className="fill-starClr"/>
                 <p>{reviews.length > 0 ? `(${reviews.length})` : '(No reviews)'}</p> 
            </div>
        </article>
    </div>
    
  )
}

export default ProductCard