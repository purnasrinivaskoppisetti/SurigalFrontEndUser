"use client";

import {
  useEffect,
  useState,
} from "react";

import { getCartService } from "@/services/cart.service";
import { paymentSuccessService } from "@/services/payment";
export default function usePayment() {
  // =========================
  // STATES
  // =========================
  const [cartItems, setCartItems] =
    useState([]);

  const [summary, setSummary] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [paymentResponse, setPaymentResponse] =
    useState(null);

  // =========================
  // GET CART
  // =========================
  const fetchCart =
    async () => {
      try {
        setLoading(true);

        setError("");

        const response =
          await getCartService();

        setCartItems(
          response?.data || []
        );

        setSummary(
          response?.cart_summary ||
            {}
        );
      } catch (err) {
        setError(
          err?.response?.data
            ?.message ||
            "Failed to fetch cart"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // PAYMENT SUCCESS
  // =========================
  const handlePaymentSuccess =
    async ({
      order_id,
      transaction_id,
    }) => {
      try {
        setPaymentLoading(true);

        setError("");

        setSuccess(false);

        const response =
          await paymentSuccessService({
            order_id,
            transaction_id,
          });

        setPaymentResponse(
          response
        );

        setSuccess(true);

        return {
          success: true,
          data: response,
        };
      } catch (err) {
        const message =
          err?.response?.data
            ?.message ||
          "Payment failed";

        setError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setPaymentLoading(false);
      }
    };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchCart();
  }, []);

  return {
    // CART
    cartItems,
    summary,
    loading,
    fetchCart,

    // PAYMENT
    paymentLoading,
    handlePaymentSuccess,
    paymentResponse,

    // COMMON
    error,
    success,
  };
}