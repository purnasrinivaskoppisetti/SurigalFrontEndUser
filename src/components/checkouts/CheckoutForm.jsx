"use client";

import CheckoutInput from "./CheckoutInput";
import Text from "@/components/ui/Text";

export default function CheckoutForm() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <Text
        variant="h5"
        className="mb-6 text-black"
      >
        Billing & Shipping Address
      </Text>

      <div className="grid gap-5 md:grid-cols-2">
        <CheckoutInput
          label="Full Name"
          required
        />

        <CheckoutInput
          label="Phone Number"
          required
        />

        <div className="md:col-span-2">
          <CheckoutInput
            label="Email Address"
            required
          />
        </div>

        <div className="md:col-span-2">
          <CheckoutInput
            label="Address Line 1"
            required
          />
        </div>

        <div className="md:col-span-2">
          <CheckoutInput label="Address Line 2" />
        </div>

        <CheckoutInput
          label="City"
          required
        />

       <CheckoutInput
  label="State"
  required
  defaultValue="Andhra Pradesh"
/>

        <CheckoutInput
          label="PIN Code"
          required
        />
      </div>

      <button
        className="
          mt-8
          h-12
          w-full
          rounded-lg
          bg-green-500
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-green-600
        "
      >
        Continue to Payment →
      </button>

      <p className="mt-4 text-center text-xs text-gray-500">
        Need Help? Call us:
        +91 98765 43210
      </p>
    </div>
  );
}