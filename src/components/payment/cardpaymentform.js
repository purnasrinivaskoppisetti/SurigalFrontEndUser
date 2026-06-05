"use client";

import { Button } from "..";

export default function CardPaymentForm() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-black">
        Card Details
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Card Holder Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            className="h-12 w-full rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Card Number
          </label>

          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="h-12 w-full rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Expiry
            </label>

            <input
              type="text"
              placeholder="MM/YY"
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
              className="h-12 w-full rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
            />
          </div>
        </div>

        <Button
          size="lg"
          className="mt-4 w-full"
        >
          Pay Securely
        </Button>
      </div>
    </div>
  );
}