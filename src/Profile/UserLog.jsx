import { NavLink } from "react-router";
import Button from "../components/buttons/Button"
import {useCart} from "../context/CartContext"
import CheckoutCard from "../components/CheckoutCard";
import {useState, useEffect} from 'react';
const UserLog = ({ accountInfo }) => {
    const {getCompletedOrders} = useCart();
    const [cartItems,setCartItems] = useState([]);
    useEffect(() => {
      (async () => {
        const res = await getCompletedOrders(); // ✅ await
        if (res?.success) {
          setCartItems(res.data); // orders array
        } else {
          setCartItems([]);
        }
      })();
    }, []);

    function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <div className="sm:flex w-full justify-center">
      <div className="basis-[40%] flex flex-col gap-3">
        <h1 className="text-xl">Сайн байна уу? {accountInfo?.name}</h1> 
        {accountInfo?.role === 'admin' && <NavLink to="/profile/dashboard" className="rounded-full bg-pink-300 py-2 px-5 animate-bounce">Dashboard</NavLink>}  
        <Button onClick={handleLogout}>Logout</Button>
    </div>
      {accountInfo?.role ==='user' && <div className="basis-[60%] border rounded-lg p-2">
        <h2 className="font-bold text-2xl mb-5">Таны захиалгууд</h2>
          {cartItems.length>0 ?cartItems.map((order) => (
          <li key={order._id} className="border list-none rounded-lg p-3 mb-4 w-full">
            <div className="flex justify-between mb-2">
              <span className="font-bold">
                Order #{order._id.slice(-6)}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <ul className="flex flex-col gap-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-center">
                  <img
                    src={item.product.images?.[0]}
                    className="w-12 h-12 object-cover rounded"
                    alt={item.product.title}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.product.title}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.qty} × ${item.product.newPrice}
                    </p>
                  </div>
                  <span className="font-bold">
                    ${(item.qty * item.product.newPrice).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        )) :
        <div className="flex flex-col items-center gap-2" >
            <p className="text-red-500">Та одоогоор бараа захиалаагүй байна</p> 
            <NavLink to="/products" className=" mx-auto rounded-2xl transition-all duration-150 hover:scale-105 active:scale-95 active:bg-gray-100 py-1 px-3 bg-black text-white text-sm" > Explore more </NavLink>
        </div>}
      </div>}
      
    </div>
    
  )
}

export default UserLog