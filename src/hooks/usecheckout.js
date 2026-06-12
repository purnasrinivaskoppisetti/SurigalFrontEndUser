


"use client";

import { useEffect, useState } from "react";

import { getCartService } from "@/services/cart.service";
import {
  createOrderService,
  paymentSuccessService,
  getCartSummaryService,
} from "@/services/payment";

import { getAddressesService } from "@/services/address.service";

export default function useCheckout() {
  // ======================
  // STATE
  // ======================
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [orderData, setOrderData] = useState(null);
  const [popupSummary, setPopupSummary] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // ======================
  // INIT ADDRESS
  // ======================
  useEffect(() => {
    const saved = localStorage.getItem("selected_address");

    if (saved) {
      try {
        setSelectedAddress(JSON.parse(saved));
      } catch (e) {
        console.error("Invalid address");
      }
    }
  }, []);

  // ======================
  // LOAD CART
  // ======================
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCartService();
      setCartItems(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // LOAD ADDRESSES
  // ======================
  const fetchAddresses = async () => {
    try {
      const res = await getAddressesService();
      setAddresses(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  // ======================
  // CART SUMMARY
  // ======================
  const getCartSummary = async () => {
    try {
      const res = await getCartSummaryService();
      const summary = res?.data?.data || res?.data;

      setPopupSummary(summary);
      return res;
    } catch (err) {
      console.error("Summary error:", err);
      return null;
    }
  };

  // ======================
  // PLACE ORDER (FIXED)
  // ======================
  const placeOrder = async () => {
    const addressId = selectedAddress?.id;

    if (!addressId) {
      alert("Please select address");
      return null;
    }

    try {
      setOrderLoading(true);

      const payload = {
        address_id: addressId,
        payment_method: "cod",
        coupon_code: couponCode || "",
      };

      const res = await createOrderService(payload);

      const order = res?.data?.data || res?.data;

      setOrderData(order);

      // 🔥 IMPORTANT: RETURN ORDER
      return order;
    } catch (err) {
      console.error("Order error:", err);
      return null;
    } finally {
      setOrderLoading(false);
    }
  };

  // ======================
  // PAYMENT SUCCESS (FIXED)
  // ======================
  const handlePaymentSuccess = async (payload) => {
    try {
      setPaymentLoading(true);

      const res = await paymentSuccessService({
        order_id: payload?.order_id,
        transaction_id: payload?.transaction_id,
        amount: payload?.amount || 0,
        payment_method: payload?.payment_method || "COD",
      });

      setShowPaymentModal(false);
      fetchCart();

      return res;
    } catch (err) {
      console.error("Payment error:", err);
      throw err;
    } finally {
      setPaymentLoading(false);
    }
  };

  return {
    cartItems,
    addresses,
    selectedAddress,
    setSelectedAddress,

    loading,
    orderLoading,
    paymentLoading,

    popupSummary,

    couponCode,
    setCouponCode,

    showPaymentModal,
    setShowPaymentModal,

    fetchCart,
    fetchAddresses,
    getCartSummary,
    placeOrder,
    handlePaymentSuccess,
  };
}