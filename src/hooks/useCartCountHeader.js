"use client";

import {
  useState,
  useEffect,
  useCallback,
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
    useCallback(async () => {
      try {
        if (!user?.id) {
          setCartCount(0);
          return;
        }

        const response =
          await getCartService();

        if (response?.success) {
          setCartCount(
            response
              ?.cart_summary
              ?.total_items || 0
          );
        }
      } catch (error) {
        console.error(
          "Cart Count Error:",
          error
        );
      }
    }, [user?.id]);

  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );
    };
  }, [fetchCartCount]);

  return {
    cartCount,
    fetchCartCount,
  };
}