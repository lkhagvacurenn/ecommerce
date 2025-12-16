import { useState, useEffect } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import LoginRequiredModal from "../modals/LoginRequiredModal";

const LikeBtn = ({ id }) => {
  const { getItem, addItem, removeItem } = useCart();
  const [isLiked, setLike] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      try {
        const res = await getItem(id);
        setLike(res?.data?.isLiked ?? false);
      } catch (error) {
        console.error("Error checking liked item:", error);
      }
    })();
  }, [id, isLoggedIn]);

  async function handleClick(e) {
    e.stopPropagation();

    // 🔴 Not logged in → show modal
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isLiked) {
        await removeItem(id);
      } else {
        await addItem({ productID: id, qty: 1 });
      }
      setLike((prev) => !prev);
    } catch (error) {
      console.error("Error toggling cart item:", error);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`flex p-2 rounded-2xl bg-white ${
          isLiked ? "text-primaryClr" : ""
        }`}
      >
        <FaShoppingBasket />
      </button>

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default LikeBtn;
