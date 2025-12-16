import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
const OrderSuccessModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const {reload} = useCart()
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
    }, [open]);

  if (!open) return null;
    

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
        navigate("/");
      }}
    >
      <div
        className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2 text-green-600">
          Order Successful
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Thank you! Your order has been placed successfully.
        </p>

        <div className="flex justify-center gap-2">
            <Button onClick={() => {reload(), navigate("/")}}>
                Go to home
            </Button>
            <Button onClick={() => { reload(), navigate("/products")}}>
                Continue Shopping
            </Button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default OrderSuccessModal;
