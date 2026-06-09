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
  const [selectedMethod, setSelectedMethod] =
    useState("card");

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
    handlePaymentSuccess,
  } = usePayment();

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
              {cartItems?.map((item) => (
                <div
                  key={item?.cart_id}
                  className="flex items-center gap-4 border-b pb-5 last:border-b-0"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      item?.thumbnail_url ||
                      "/placeholder.png"
                    }
                    alt={item?.name}
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
                        item?.sale_price || 0
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAYMENT METHODS */}
        <PaymentMethods
          selected={selectedMethod}
          setSelected={
            setSelectedMethod
          }
        />

        {/* CARD */}
        {selectedMethod ===
          "card" && (
          <CardPaymentForm
            loading={
              paymentLoading
            }
            error={error}
            success={success}
            handlePaymentSuccess={
              handlePaymentSuccess
            }
          />
        )}

        {/* UPI */}
        {selectedMethod ===
          "upi" && (
          <UpiPayment
            loading={
              paymentLoading
            }
            error={error}
            success={success}
            handlePaymentSuccess={
              handlePaymentSuccess
            }
          />
        )}

        {/* BANK */}
        {selectedMethod ===
          "bank" && (
          <NetBanking
            loading={
              paymentLoading
            }
            error={error}
            success={success}
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
            summary?.subtotal || 0
          }
          totalItems={
            summary?.total_items || 0
          }
        />
      </div>
    </div>
  );
}