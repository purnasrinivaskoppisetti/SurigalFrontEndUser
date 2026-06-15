"use client";
 
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCartService } from "@/services/cart.service";
 
export default function useCartList() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    total_items: 0,
  });
 
  const user = useSelector((state) => state.user?.user);
 
  const fetchCart = async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }
 
      if (!user?.id) {
        // =========================
        // GUEST CART FETCH
        // =========================
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
 
        // Structure the data to match your API response so UI doesn't break
        const formattedCart = guestCart.map((item) => ({
          cart_id: item.cart_id,
          product_id: item.product_id,
          quantity: item.quantity,
          ...(item.product || {}), // Safely unpack product details
          sale_price: item.product?.sale_price || 0, // Explicit fallback
          mrp: item.product?.mrp || 0, // Explicit fallback
        }));
 
        const total_items = guestCart.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const subtotal = guestCart.reduce(
          (sum, item) =>
            sum + (item.product?.sale_price || 0) * item.quantity,
          0
        );
 
        setCart(formattedCart);
        setSummary({
          subtotal,
          total_items,
        });
 
        return;
      }
 
      // =========================
      // LOGGED IN CART FETCH
      // =========================
      const response = await getCartService();
 
      if (response.success) {
        setCart([...response.data]);
        setSummary({
          ...response.cart_summary,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };
 
  return {
    cart,
    summary,
    loading,
    fetchCart,
    setCart,
    setSummary,
  };
}
 