import { useNavigate } from "react-router-dom";
import Counter from "./Counter";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const CheckoutCard = ({ cartItem }) => {
  const navigate = useNavigate();
  const { updateItem,removeItem } = useCart();

  const [orderCount, setOrderCount] = useState(cartItem.qty);
  const [loading, setLoading] = useState(false);

  // keep local state in sync if cart updates from elsewhere
  useEffect(() => {
    setOrderCount(cartItem.qty);
  }, [cartItem.qty]);

  async function handleClick(delta, e) {
    e?.stopPropagation();

    const stock = Number(cartItem.product?.stock ?? 0);
    const next = Math.min(Math.max(orderCount + delta, 1), stock);
    if (next === orderCount) return;

    setOrderCount(next);
    setLoading(true);

    try {
      await updateItem({
        productID: cartItem.product.id || cartItem.product._id,
        qty: next
      });
    } catch (err) {
      console.error("Failed to update cart item", err);
      // rollback on failure
      setOrderCount(cartItem.qty);
    } finally {
      setLoading(false);
    }
  }

  const goToProduct = () =>
    navigate(`/products/${cartItem.product.id || cartItem.product._id}`);

  const unitPrice =
    typeof cartItem.product.newPrice === "number"
      ? cartItem.product.newPrice
      : cartItem.product.price;

  return (
    <li
      onClick={goToProduct}
      className="cursor-pointer flex h-fit gap-3 mb-2"
    >
      <img
        src={cartItem.product.images?.[0]}
        alt="product img"
        className="w-16 object-cover aspect-square border rounded-md"
      />

      <small className="flex flex-col w-full items-start justify-between">
        <p className="text-sm font-bold">
          {cartItem.product.title}
        </p>
          <Counter
          key={cartItem.product.id}
          orderCount={orderCount}
          onClick={handleClick}
          stock={cartItem.product.stock}
          disabled={loading}
         />
       
      </small>

      <p className="flex flex-col w-full items-end justify-between">
        <span>${(unitPrice * orderCount).toFixed(2)}</span>
        {cartItem.product.discountPercent > 0 && (
          <span className="line-through text-red-500 text-sm">
            ${(cartItem.product.price * orderCount).toFixed(2)}
          </span>
        )}
        <FaTrashAlt
          className="mt-3 text-red-500 hover:text-red-700 cursor-pointer"
          onClick={async (e) => {
            e.stopPropagation();
            await removeItem(cartItem.product.id || cartItem.product._id);
          }}
        />
      </p>
    </li>
  );
};

export default CheckoutCard;
