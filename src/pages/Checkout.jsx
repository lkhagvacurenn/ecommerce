import { useNavigate } from "react-router-dom";
import CheckoutForm from "../components/forms/CheckoutForm";
import { FaRegUser, FaSearchLocation } from "react-icons/fa";
import Button from "../components/buttons/Button";
import CheckoutCard from "../components/CheckoutCard";
import { useCart } from "../context/CartContext";
import OrderSuccessModal from "../components/modals/OrderSuccessModal";
import { useState } from "react";

const Checkout = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);
  const navigate = useNavigate();
   const { cart,loading,checkout,reload } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  if(!isLoggedIn){
    return <div className="py-12  w-full mx-auto flex flex-col gap-5 items-center">
        <p className="font-bold text-2xl text-center">You need to login first honey!</p>
        <Button onClick={() => navigate("/profile/login")}>Login</Button>
        </div>
  } 
 
  const cartItems = cart?.items || [];

  const total = cartItems.reduce((sum, item) => {
    const price =
      typeof item.product.newPrice === "number"
        ? item.product.newPrice
        : item.product.price;

    return sum + price * item.qty;
  }, 0);

  if (loading) {
    return <p className="text-center p-10">Loading...</p>;
  }

  if (cartItems.length === 0) {
    return (
      <p className="mx-auto my-auto flex flex-col gap-5 items-center ">
        <p className="text-3xl text-red-500">Empty basket</p>
        <Button  onClick={() => navigate("/products")}>Explore more</Button>
      </p>
    );
  }

  async function handleCheckout() {
    const res = await checkout();

    if (res.success) {
        setShowSuccess(true);
    } else {
        alert(res.message || "Checkout failed");
    }
  }

  return (
    <>
      <h1 className="basis-full font-bold text-2xl">Checkout</h1>

      <div className="sm:flex w-full gap-5">
        {/* LEFT */}
        <div className="basis-[50%]">
          <CheckoutForm
            title="Contact info"
            icon={<FaRegUser />}
            fields={[
              { label: "Phone number", name: "phoneNumber", type: "tel", basis: "basis-1/2", required: true },
              { label: "Email address", name: "email", type: "email", basis: "basis-1/2", required: true }
            ]}
          />

          <CheckoutForm
            title="Shipping address"
            icon={<FaSearchLocation />}
            fields={[
              { label: "Reciever Name", name: "firstName", type: "text", basis: "basis-full", required: true },
              { label: "City", name: "city", type: "text", basis: "basis-full", required: true },
              { label: "Address line 1", name: "address1", type: "text", basis: "basis-[70%]", required: true },
              { label: "Apt, Suite", name: "apt", type: "text", basis: "basis-[30%]" },
            ]}
          />
        </div>

        {/* RIGHT */}
        <div className="basis-[50%]">
          <h2 className="text-2xl font-bold">Order summary</h2>

          <ul className="w-full my-5">
            {cartItems.map((cartItem) => (
              <CheckoutCard
                key={cartItem.product.id}
                cartItem={cartItem}
              />
            ))}

            <p className="p-2 my-2 border-y flex justify-between">
              <strong>Your Total:</strong>
              <span>${total.toFixed(2)}</span>
            </p>
            <Button width="full" onClick={handleCheckout}>Confirm Order</Button>
          </ul>
        </div>
      </div>
       <OrderSuccessModal
            open={showSuccess}
            onClose={() => {
                setShowSuccess(false);
                reload();
            }}
        />
    </>
  );
};

export default Checkout;
