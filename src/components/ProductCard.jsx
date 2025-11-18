import { useNavigate } from 'react-router-dom';
import {FaStar} from 'react-icons/fa'
import ProductThumbnail from './ProductThumbnail';
const ProductCard = ({d}) => {
    
    const price = Number(d.price ?? 0);
    const discount = Number(d.discountPercentage ?? 0);
    const newPrice =
    discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;
    const count = d.reviews.length;
    const navigate = useNavigate();
   
  return (
    <div onClick={()=> navigate(`/products/${d.id}`)} className="bg-white w-60 p-2 mx-auto">
        <div className='relative flex justify-center w-full h-60 p-2 rounded-md bg-boxBgClr'>
            <ProductThumbnail img={d.thumbnail} id={d.id} width='full'/>
        </div>
        <article className="">
            <div className="flex justify-between text-[14px] gap-1">
                <p className="flex flex-col w-full max-w-[70%]">
                    <strong className="font-bold truncate ">
                        {d.title}
                    </strong>
                    <span className="text-spanClr">
                        {d.category}
                    </span>
                </p>
                <p className="flex flex-col">
                    <strong>
                        ${newPrice}
                    </strong>
                    <span className="text-spanClr line-through">
                        ${d.price}
                    </span>
                </p>
            </div>
            <div className="flex gap-1 items-center">
                <FaStar className="fill-starClr"/>
                <p>${d.rating}</p>
                <p>({count})</p>
            </div>
        </article>
    </div>
    
  )
}

export default ProductCard