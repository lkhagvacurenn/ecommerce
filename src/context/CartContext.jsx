import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart, getCartProduct as apiGetItem, addItemToCart as apiAddItem, deleteCartItem as apiRemoveItem, updateCartItem as apiUpdateItem, checkout as apiCheckout, getCompletedOrders as apiGetCompletedOrders} from "../services/api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartItem,setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const res = await getCart();
      if (res && res.data) setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addItem = async ({ productID, qty = 1 }) => {
    const token = localStorage.getItem("token");
    const res = await apiAddItem(token, { productID, qty });
    if (res && (res.success ?? true)) {
      // prefer API returning new cart; if not, re-fetch
      if (res.data) setCart(res.data);
      else await loadCart();
    }
    return res;
  };

  const getItem = async (productID) => {
    const token = localStorage.getItem("token");
    try {
      const res = await apiGetItem(token, productID);
      // Controller contract: { success, data: { cart, item } | null, isLiked: boolean }
      if (res && (res.success ?? true)) {
        // store the returned data and also set cart if present
        if (res.data && res.data.cart) setCart(res.data.cart);
        setCartItem(res.data || null); // store { cart, item } or null
      }
      return res;
    } catch (err) {
      console.error("getItem error", err);
      throw err;
    }
  };

  const removeItem = async (productID) => {
    const token = localStorage.getItem("token");
    const res = await apiRemoveItem(token, productID);
    if (res && (res.success ?? true)) {
      if (res.data) setCart(res.data);
      else await loadCart();
    }
    return res;
  };

  const updateItem = async ({ productID, qty }) => {
  const token = localStorage.getItem("token");

  const res = await apiUpdateItem(token, { productID, qty });

  if (res && (res.success ?? true)) {
    // backend should return updated cart
    if (res.data) {
      setCart(res.data);
    } else {
      await loadCart();
    }
  }

  return res;
};

  const checkout = async () => {
    const token = localStorage.getItem("token");

    const res = await apiCheckout(token);

    // if (res && (res.success ?? true)) {
    //   // cart is now completed → clear it
    //   setCart(null);
    // }

    return res;
  };

  const getCompletedOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await apiGetCompletedOrders(token);
    return res; // { success, data }
  };



  return (
    <CartContext.Provider value={{ cart, setCart, loading, addItem, removeItem, reload: loadCart, getItem,cartItem, updateItem,checkout,getCompletedOrders}}>
      {children}
    </CartContext.Provider>
  );
};
