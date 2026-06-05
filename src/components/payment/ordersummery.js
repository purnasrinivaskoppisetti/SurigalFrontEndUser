"use client";

export default function PaymentSummary({
  amount,
  totalItems,
}) {
  return (
    <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-black">
        Payment Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Total Items
          </span>

          <span className="font-semibold">
            {totalItems}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Delivery
          </span>

          <span className="font-semibold text-green-600">
            Free
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between">
          <span className="text-lg font-bold">
            Total Amount
          </span>

          <span className="text-2xl font-bold text-black">
            ₹
            {Number(
              amount
            ).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}