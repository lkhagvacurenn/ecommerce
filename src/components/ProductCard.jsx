import { useNavigate } from 'react-router-dom';
import {FaStar} from 'react-icons/fa'
import LikeBtn from "./buttons/LikeBtn.jsx";
const ProductCard = ({d}) => {
    const price = Number(d.price ?? 0);
    const discount = Number(d.discountPercentage ?? 0);
    const newPrice =
    discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;

    const count = d.reviews.length;
    const starTotal = d.reviews.reduce((acc, r) => acc + (r.rating ?? 0), 0);
    const avgStar = count ? (starTotal / count).toFixed(1) : "5.0";

    const navigate = useNavigate();
   
  return (
    <div onClick={()=> navigate(`/products/${d.id}`)} className="bg-white w-60 p-2 mx-auto">
        <div className=" w-full h-60 p-2 rounded-md bg-boxBgClr">
            <LikeBtn key={d.id}/>
            <img className="mx-auto w-[80%] object-cover " src={d.thumbnail} alt="d.title"/>
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
                <p>{avgStar}</p>
                <p>({count})</p>
            </div>
        </article>
    </div>
    
  )
}

export default ProductCard