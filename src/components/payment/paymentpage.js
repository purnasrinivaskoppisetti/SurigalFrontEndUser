"use client";

import { useState } from "react";

import PaymentMethods from "./paymentmethod";
import UpiPayment from "./upipayment";
import CardPaymentForm from "./cardpaymentform";
import NetBanking from "./netbanking";
import PaymentSummary from "./ordersummery";

import usePayment from "@/hooks/usePayment";

export default function PaymentPageContent() {

  // =========================
  // STATES
  // =========================
  const [
    selectedMethod,
    setSelectedMethod,
  ] = useState("cod");

  const [orderId, setOrderId] =
    useState("");

  // =========================
  // HOOK
  // =========================
  const {
    cartItems,
    summary,
    loading,
    paymentLoading,
    error,
    success,

    // PAYMENT
    handlePaymentSuccess,
    handleCreateOrder,

    // ADDRESS
    addresses,
    selectedAddress,
    setSelectedAddress,

  } = usePayment();

  // =========================
  // CREATE ORDER
  // =========================
  const createOrder =
    async (
      paymentMethod
    ) => {

      try {

        // =========================
        // ADDRESS VALIDATION
        // =========================
        if (
          !selectedAddress?.id
        ) {

          alert(
            "Please select address"
          );

          return null;
        }

        // =========================
        // CREATE ORDER API
        // =========================
        const response =
          await handleCreateOrder({

            address_id:
              selectedAddress.id,

            payment_method:
              paymentMethod || "cod",

            coupon_code:
              null,
          });

        console.log(
          "FULL ORDER RESPONSE:",
          response
        );

        // =========================
        // GET ORDER ID
        // =========================
        const createdOrderId =

          response?.orderId ||

          response?.data?.orderId ||

          response?.data?.id ||

          response?.data?.order_id ||

          response?.data?.data?.id ||

          response?.data?.data?.order_id ||

          response?.id ||

          response?.order_id;

        console.log(
          "FINAL ORDER ID:",
          createdOrderId
        );

        // =========================
        // VALIDATION
        // =========================
        if (
          !createdOrderId
        ) {

          alert(
            "Order ID not found"
          );

          return null;
        }

        // =========================
        // SAVE ORDER ID
        // =========================
        setOrderId(
          createdOrderId
        );

        return createdOrderId;

      } catch (error) {

        console.log(
          "CREATE ORDER ERROR:",
          error
        );

        return null;
      }
    };

  return (
    <div className="grid gap-8 lg:grid-cols-3">

      {/* LEFT SIDE */}
      <div className="space-y-6 lg:col-span-2">

        {/* LOADING */}
        {loading && (
          <div className="rounded-3xl border bg-white p-6">
            Loading cart...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-500">
            {error}
          </div>
        )}

        {/* CART ITEMS */}
        {!loading && (
          <div className="rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold text-black">
              Your Cart
            </h2>

            <div className="mt-6 space-y-5">

              {cartItems?.map(
                (item) => (
                  <div
                    key={
                      item?.cart_id
                    }
                    className="flex items-center gap-4 border-b pb-5 last:border-b-0"
                  >

                    {/* IMAGE */}
                    <img
                      src={
                        item?.thumbnail_url ||
                        "/placeholder.png"
                      }
                      alt={
                        item?.name
                      }
                      className="h-24 w-24 rounded-2xl border object-cover"
                    />

                    {/* DETAILS */}
                    <div className="flex-1">

                      <h3 className="text-lg font-semibold text-black">
                        {item?.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Brand:
                        {" "}
                        {item?.brand}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity:
                        {" "}
                        {item?.quantity}
                      </p>

                      <p className="mt-2 text-lg font-bold text-black">
                        ₹
                        {Number(
                          item?.sale_price ||
                          0
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* =========================
            ADDRESS SELECTION
        ========================= */}
        {/* <div>

          <h2 className="text-2xl font-bold text-black">
            Select Address
          </h2>

          <div className="mt-5 space-y-4">

            {addresses?.length > 0 ? (
              addresses.map(
                (address) => (

                  <button
                    key={address?.id}
                    type="button"
                    onClick={() =>
                      setSelectedAddress(
                        address
                      )
                    }
                    className={`
                      w-full rounded-2xl border p-4 text-left transition
                      ${
                        selectedAddress?.id === address?.id
                          ? "border-black bg-gray-50"
                          : "border-gray-200"
                      }
                    `}
                  >

                    <p className="font-semibold text-black">
                      {address?.full_name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {address?.address_line_1}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {address?.city},
                      {" "}
                      {address?.state}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {address?.pincode}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {address?.phone}
                    </p>

                  </button>
                )
              )
            ) : (
              <p className="text-sm text-gray-500">
                No addresses found
              </p>
            )}

          </div>
        </div> */}

        {/* PAYMENT METHODS */}
        <PaymentMethods
          selected={
            selectedMethod
          }
          setSelected={
            setSelectedMethod
          }
        />

        {/* COD */}
        {selectedMethod ===
          "cod" && (
          <CardPaymentForm
            orderId={orderId}
            loading={
              paymentLoading
            }
            error={error}
            success={success}
            createOrder={
              createOrder
            }
            handlePaymentSuccess={
              handlePaymentSuccess
            }
          />
        )}

        {/* UPI */}
        {selectedMethod ===
          "upi" && (
          <UpiPayment
            orderId={orderId}
            loading={
              paymentLoading
            }
            error={error}
            success={success}
            createOrder={
              createOrder
            }
            handlePaymentSuccess={
              handlePaymentSuccess
            }
          />
        )}

        {/* BANK */}
        {selectedMethod ===
          "bank" && (
          <NetBanking
            orderId={orderId}
            loading={
              paymentLoading
            }
            error={error}
            success={success}
            createOrder={
              createOrder
            }
            handlePaymentSuccess={
              handlePaymentSuccess
            }
          />
        )}
      </div>

      {/* RIGHT SIDE */}
      <div>
        <PaymentSummary
          amount={
            summary?.subtotal ||
            0
          }
          totalItems={
            summary?.total_items ||
            0
          }
        />
      </div>
    </div>
  );
}