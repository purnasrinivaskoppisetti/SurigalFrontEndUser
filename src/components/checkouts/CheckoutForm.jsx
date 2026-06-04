

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CheckoutInput from "./CheckoutInput";
import Text from "@/components/ui/Text";

import useAddress from "@/hooks/useAddress";

export default function CheckoutForm() {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);

  const {
    formData,
    addresses,
    selectedAddress,
    setSelectedAddress,
    errors,
    handleChange,
    handleSubmit,
    handleDelete,
    fetchAddress,
    resetForm,
    submitLoading,
    deleteLoading,
    success,
    apiError,
    isEdit,
  } = useAddress();

  // Show form only if:
  // 1. no address exists
  // 2. user clicks add new address
  // 3. user clicks edit
  const shouldShowForm =
    addresses?.length === 0 || showForm || isEdit;

  // Continue Payment
  const handleContinuePayment = () => {
    // if (!selectedAddress) return;

    // localStorage.setItem(
    //   "selected_address",
    //   JSON.stringify(selectedAddress)
    // );

    // router.push("/payment");
  };

  // Save / Update Address
  const handleAddressSubmit = async (e) => {
    const response = await handleSubmit(e);

    // hide form after success
    if (response !== false) {
      setShowForm(false);

      // clear edit mode
      resetForm();
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <Text
        variant="h5"
        className="mb-6 text-black"
      >
        Billing & Shipping Address
      </Text>

      {/* ===================== */}
      {/* SAVED ADDRESSES */}
      {/* ===================== */}
      {addresses?.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Text
              variant="h6"
              className="text-black"
            >
              Saved Addresses
            </Text>

            {/* Add Address */}
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(true);
                setSelectedAddress(null);
              }}
              className="
                rounded-lg
                border
                border-green-500
                px-4
                py-2
                text-sm
                font-medium
                text-green-600
                hover:bg-green-50
              "
            >
              + Add New Address
            </button>
          </div>

          <div className="space-y-4">
            {addresses.map((address) => {
              const isSelected =
                selectedAddress?.id === address?.id;

              return (
                <div
                  key={address?.id}
                  onClick={() =>
                    setSelectedAddress(address)
                  }
                  className={`
                    cursor-pointer
                    rounded-xl
                    border
                    p-4
                    transition
                    ${
                      isSelected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left */}
                    <div>
                      <h3 className="text-sm font-semibold text-black">
                        {address?.full_name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        {address?.address_line1}
                      </p>

                      {address?.address_line2 && (
                        <p className="text-sm text-gray-600">
                          {address?.address_line2}
                        </p>
                      )}

                      <p className="text-sm text-gray-600">
                        {address?.city},{" "}
                        {address?.state} -{" "}
                        {address?.pincode}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {address?.phone}
                      </p>

                      {/* EMAIL */}
                      <p className="mt-1 text-sm text-gray-600">
                        {address?.email}
                      </p>

                      {address?.is_default && (
                        <span
                          className="
                            mt-2
                            inline-block
                            rounded-full
                            bg-green-100
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-green-700
                          "
                        >
                          Default
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          setShowForm(true);

                          fetchAddress(address?.id);
                        }}
                        className="
                          rounded-lg
                          border
                          border-gray-300
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-black
                          hover:bg-gray-100
                        "
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        disabled={deleteLoading}
                        onClick={(e) => {
                          e.stopPropagation();

                          handleDelete(address?.id);
                        }}
                        className="
                          rounded-lg
                          border
                          border-red-200
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-red-500
                          hover:bg-red-50
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Payment */}
          {selectedAddress && (
            <button
              type="button"
              onClick={handleContinuePayment}
              className="
                mt-6
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
              Continue To Payment →
            </button>
          )}
        </div>
      )}

      {/* ===================== */}
      {/* FORM */}
      {/* ===================== */}
      {shouldShowForm && (
        <>
          {addresses?.length > 0 && (
            <div className="my-8 border-t pt-8" />
          )}

          <form onSubmit={handleAddressSubmit}>
            <div className="mb-5 flex items-center justify-between">
              <Text
                variant="h6"
                className="text-black"
              >
                {isEdit
                  ? "Edit Address"
                  : "Add New Address"}
              </Text>

              {/* Close Form */}
              {addresses?.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="text-sm font-medium text-red-500"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <CheckoutInput
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />

                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.full_name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <CheckoutInput
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <CheckoutInput
                  label="Email Address"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <CheckoutInput
                  label="Address Line 1"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  required
                />

                {errors.address_line1 && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.address_line1}
                  </p>
                )}
              </div>

              {/* Address Line 2 */}
              <div className="md:col-span-2">
                <CheckoutInput
                  label="Address Line 2"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                />
              </div>

              {/* Landmark */}
              <div className="md:col-span-2">
                <CheckoutInput
                  label="Landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                />
              </div>

              {/* City */}
              <div>
                <CheckoutInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <CheckoutInput
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />

                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.state}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <CheckoutInput
                  label="PIN Code"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />

                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.pincode}
                  </p>
                )}
              </div>

              {/* Address Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address Type
                </label>

                <select
                  name="address_type"
                  value={formData.address_type}
                  onChange={handleChange}
                  className="
                    h-12
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    text-sm
                    outline-none
                  "
                >
                  <option value="home">
                    Home
                  </option>

                  <option value="work">
                    Work
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* Default */}
              <div className="flex items-center gap-3 pt-8">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <label className="text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>

            {/* API Error */}
            {apiError && (
              <p className="mt-4 text-sm text-red-500">
                {apiError}
              </p>
            )}

            {/* Success */}
            {success && (
              <p className="mt-4 text-sm text-green-600">
                Address saved successfully
              </p>
            )}

            {/* Save Button */}
            <button
              type="submit"
              disabled={submitLoading}
              className="
                mt-8
                h-12
                w-full
                rounded-lg
                bg-black
                text-sm
                font-semibold
                text-white
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {submitLoading
                ? "Saving..."
                : isEdit
                ? "Update Address"
                : "Save Address"}
            </button>
          </form>
        </>
      )}

      <p className="mt-4 text-center text-xs text-gray-500">
        Need Help? Call us: +91 98765 43210
      </p>
    </div>
  );
}