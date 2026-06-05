"use client";

import { useState } from "react";

import PaymentMethods from "./paymentmethod";
import UpiPayment from "./upipayment";
import CardPaymentForm from "./cardpaymentform";
import NetBanking from "./netbanking";
import PaymentSummary from "./ordersummery";

export default function PaymentPageContent({
  cartItems = [],
  summary,
}) {
  const [selectedMethod, setSelectedMethod] =
    useState("card");

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">
        {/* CART ITEMS */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-black">
            Your Cart
          </h2>

          <div className="mt-6 space-y-5">
            {cartItems?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-5 last:border-b-0"
              >
                {/* IMAGE */}
                <img
                  src={
                    item.image ||
                    "/placeholder.png"
                  }
                  alt={item.name}
                  className="h-24 w-24 rounded-2xl border object-cover"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Qty:
                    {" "}
                    {item.quantity}
                  </p>

                  <p className="mt-2 text-lg font-bold text-black">
                    ₹
                    {Number(
                      item.price
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT METHODS */}
        <PaymentMethods
          selected={selectedMethod}
          setSelected={
            setSelectedMethod
          }
        />

        {/* DYNAMIC PAYMENT FORM */}
        {selectedMethod === "card" && (
          <CardPaymentForm />
        )}

        {selectedMethod === "upi" && (
          <UpiPayment />
        )}

        {selectedMethod === "bank" && (
          <NetBanking />
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