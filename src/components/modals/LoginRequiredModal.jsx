import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
const LoginRequiredModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999]  bg-black/50 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation(); 
        onClose();
      }}
    >
      <div
        className="bg-white rounded-xl px-6 py-10 w-[90%] max-w-sm"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-2xl text-center font-bold mb-2">Login required</h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          You need to log in to like products.
        </p>

        <div className="flex justify-center gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/profile/login");
            }}
            className="px-4 py-2 bg-primaryClr text-white rounded"
          >
            Login
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default LoginRequiredModal;
