"use client";

import { useState } from "react";

import { Button } from "..";

import usePaymentSuccess from "@/hooks/usePayment";

export default function CardPaymentForm({
  orderId,
}) {
  // =========================
  // STATES
  // =========================
  const [cardHolder, setCardHolder] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  // =========================
  // HOOK
  // =========================
  const {
    loading,
    error,
    success,
    handlePaymentSuccess,
  } = usePaymentSuccess();

  // =========================
  // HANDLE PAYMENT
  // =========================
  const handleSubmit = async () => {
    if (
      !cardHolder ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    // DEMO TRANSACTION ID
    const transactionId = `TXN-${Date.now()}`;

    const response =
      await handlePaymentSuccess({
        order_id: orderId,
        transaction_id:
          transactionId,
      });

    if (response.success) {
      alert(
        "Payment Successful"
      );
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-black">
        Card Details
      </h2>

      <div className="mt-6 space-y-5">
        {/* CARD HOLDER */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Card Holder Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={cardHolder}
            onChange={(e) =>
              setCardHolder(
                e.target.value
              )
            }
            className="h-12 w-full rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
          />
        </div>

        {/* CARD NUMBER */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Card Number
          </label>

          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) =>
              setCardNumber(
                e.target.value
              )
            }
            className="h-12 w-full rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
          />
        </div>

        {/* EXPIRY + CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Expiry
            </label>

            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) =>
                setExpiry(
                  e.target.value
                )
              }
              className="h-12 w-full rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              CVV
            </label>

            <input
              type="password"
              placeholder="123"
              value={cvv}
              onChange={(e) =>
                setCvv(
                  e.target.value
                )
              }
              className="h-12 w-full rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
            />
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="text-sm text-green-600">
            Payment successful
          </p>
        )}

        {/* BUTTON */}
        <Button
          size="lg"
          className="mt-4 w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Pay Securely"}
        </Button>
      </div>
    </div>
  );
}