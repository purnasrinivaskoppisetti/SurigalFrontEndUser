"use client";

export default function UpiPayment() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-black">
        UPI Payment
      </h2>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Enter UPI ID
        </label>

        <input
          type="text"
          placeholder="example@upi"
          className="h-12 w-full rounded-2xl border border-gray-300 px-4 outline-none focus:border-black"
        />

        <button
          className="
            mt-5
            h-12
            w-full
            rounded-2xl
            bg-black
            text-sm
            font-semibold
            text-white
          "
        >
          Verify & Pay
        </button>
      </div>
    </div>
  );
}