"use client";

import {
  useEffect,
  useState,
} from "react";

import { useSelector } from "react-redux";

import { getCartService } from "@/services/cart.service";

export default function useCartCount() {
  const [cartCount, setCartCount] =
    useState(0);

  const user = useSelector(
    (state) => state.user.user
  );

  const fetchCartCount =
    async () => {
      try {
        const response =
          await getCartService();

        if (
          response.success
        ) {
          setCartCount(
            response
              .cart_summary
              ?.total_items || 0
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    if (user?.id) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener(
      "cartUpdated",
      fetchCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        fetchCartCount
      );
    };
  }, []);

  return {
    cartCount,
    fetchCartCount,
  };
}