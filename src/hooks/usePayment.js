"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getCartService,
} from "@/services/cart.service";

import {
  paymentSuccessService,
  createOrderService,
} from "@/services/payment";

import {
  createAddressService,
  getAddressesService,
  getAddressServicebyid,
} from "@/services/address.service";

export default function usePayment() {

  // =========================
  // STATES
  // =========================
  const [cartItems, setCartItems] =
    useState([]);

  const [summary, setSummary] =
    useState({});

  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress, setSelectedAddress] =
    useState(null);

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

  const [orderResponse, setOrderResponse] =
    useState(null);

  const [addressResponse, setAddressResponse] =
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

        console.log(
          "CART RESPONSE:",
          response
        );

        setCartItems(
          response?.data || []
        );

        setSummary(
          response?.cart_summary ||
          {}
        );

      } catch (err) {

        console.log(err);

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
  // GET ALL ADDRESSES
  // =========================
  const fetchAddresses =
    async () => {

      try {

        setLoading(true);

        const response =
          await getAddressesService();

        console.log(
          "ADDRESSES RESPONSE:",
          response
        );

        const addressData =
          response?.data || [];

        setAddresses(
          addressData
        );

        // AUTO SELECT FIRST ADDRESS
        if (
          addressData.length > 0
        ) {

          setSelectedAddress(
            addressData[0]
          );
        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // GET ADDRESS BY ID
  // =========================
  const fetchAddressById =
    async (addressId) => {

      try {

        setLoading(true);

        const response =
          await getAddressServicebyid(
            addressId
          );

        console.log(
          "ADDRESS BY ID:",
          response
        );

        setSelectedAddress(
          response?.data || response
        );

        return response;

      } catch (err) {

        console.log(err);

        return null;

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // CREATE ADDRESS
  // =========================
  const handleCreateAddress =
    async (addressData) => {

      try {

        setLoading(true);

        setError("");

        const response =
          await createAddressService(
            addressData
          );

        console.log(
          "ADDRESS RESPONSE:",
          response
        );

        setAddressResponse(
          response
        );

        await fetchAddresses();

        return {
          success: true,
          data: response,
        };

      } catch (err) {

        console.log(err);

        const message =
          err?.response?.data
            ?.message ||
          "Failed to create address";

        setError(message);

        return {
          success: false,
          message,
        };

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // CREATE ORDER
  // =========================
  const handleCreateOrder =
    async ({
      address_id,
      payment_method = "cod",
      coupon_code = null,
    }) => {

      try {

        setPaymentLoading(true);

        setError("");

        // =========================
        // USE SELECTED ADDRESS
        // =========================
        const finalAddressId =
          address_id ||
          selectedAddress?.id;

        if (!finalAddressId) {

          setError(
            "Please select address"
          );

          return {
            success: false,
            message:
              "Address not selected",
          };
        }

        const payload = {
          address_id:
            finalAddressId,

          payment_method,

          coupon_code:
            coupon_code || null,
        };

        console.log(
          "CREATE ORDER PAYLOAD:",
          payload
        );

        const response =
          await createOrderService(
            payload
          );

        console.log(
          "CREATE ORDER RESPONSE:",
          response
        );

        setOrderResponse(
          response
        );

        // =========================
        // GET REAL ORDER ID
        // =========================
        const orderId =

          response?.data?.id ||

          response?.data?.order_id ||

          response?.id ||

          response?.order_id;

        console.log(
          "REAL ORDER ID:",
          orderId
        );

        return {
          success: true,
          data: response,
          orderId,
        };

      } catch (err) {

        console.log(err);

        const message =
          err?.response?.data
            ?.message ||
          "Order creation failed";

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

        console.log(
          "PAYMENT PAYLOAD:",
          {
            order_id,
            transaction_id,
          }
        );

        const response =
          await paymentSuccessService({
            order_id,
            transaction_id,
          });

        console.log(
          "PAYMENT RESPONSE:",
          response
        );

        setPaymentResponse(
          response
        );

        setSuccess(true);

        return {
          success: true,
          data: response,
        };

      } catch (err) {

        console.log(err);

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

    fetchAddresses();

  }, []);

  return {

    // =========================
    // CART
    // =========================
    cartItems,
    summary,
    loading,
    fetchCart,

    // =========================
    // ADDRESS
    // =========================
    addresses,
    selectedAddress,
    setSelectedAddress,

    fetchAddresses,
    fetchAddressById,

    handleCreateAddress,
    addressResponse,

    // =========================
    // ORDER
    // =========================
    handleCreateOrder,
    orderResponse,

    // =========================
    // PAYMENT
    // =========================
    paymentLoading,
    handlePaymentSuccess,
    paymentResponse,

    // =========================
    // COMMON
    // =========================
    error,
    success,
  };
}















