import { useNavigate } from "react-router"
const ShopNowBtn = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/products")} className="bg-secondaryClr text-white px-5 py-2 rounded-3xl hover:opacity-90 transition-transform hover:scale-110">
        Shop Now
    </button>
  )
}

export default ShopNowBtn