"use client";

export default function NetBanking() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-black">
        Net Banking
      </h2>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Select Bank
        </label>

        <select
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-gray-300
            px-4
            outline-none
            focus:border-black
          "
        >
          <option>
            Select Your Bank
          </option>

          <option>
            HDFC Bank
          </option>

          <option>
            SBI Bank
          </option>

          <option>
            ICICI Bank
          </option>

          <option>
            Axis Bank
          </option>
        </select>

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
          Continue To Bank
        </button>
      </div>
    </div>
  );
}