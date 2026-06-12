"use client";

import { useState } from "react";
import { getCartService } from "@/services/cart.service";

export default function useCartList() {
  const [loading, setLoading] =
    useState(true);

  const [cart, setCart] =
    useState([]);

  const [summary, setSummary] =
    useState({
      subtotal: 0,
      total_items: 0,
    });

  const fetchCart = async (
    showLoader = false
  ) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const response =
        await getCartService();

      if (response.success) {
        setCart([
          ...response.data,
        ]);

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







