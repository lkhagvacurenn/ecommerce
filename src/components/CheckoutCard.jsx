import { useNavigate } from "react-router-dom";
import { calculatePrice } from "../utils/CalculatePrice";
import FavContext from "../context/FavContext";
import Counter from "./Counter";
import { useState, useContext, useEffect } from "react";

const CheckoutCard = ({ product }) => {
  const { toggleFav} = useContext(FavContext);
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(1);

  function handleClick(delta, e) {
    e?.stopPropagation();

    setOrderCount((prev) => {
      const stock = Number(product?.stock ?? Infinity);
      const next = Math.min(Math.max(prev + delta, 0), stock);
      return next;
    });
  }

  useEffect(() => {
    if (orderCount === 0 ) {
        toggleFav(product.id);
    }
  }, [orderCount, product.id, toggleFav]);

  if (orderCount === 0) return null;

  const { totalPrice, totalNewPrice } = calculatePrice(
    product.price,
    product.discountPercentage,
    orderCount
  );

  return (
    <li
      onClick={() => navigate(`/products/${product.id}`)}
      className="cursor-pointer flex items-center gap-3 mb-2"
    >
      <img
        src={product.thumbnail}
        alt="product img"
        className="w-16 object-contain aspect-square border rounded-md"
      />
      <small>
        <p className="text-sm font-bold mb-2">{product.title}</p>
        <Counter orderCount={orderCount} onClick={handleClick} stock={product.stock} />
      </small>
      <p className="ml-auto flex flex-col">
        <span>${totalNewPrice}</span>
        <span className="line-through">${totalPrice}</span>
      </p>
    </li>
  );
};

export default CheckoutCard;
