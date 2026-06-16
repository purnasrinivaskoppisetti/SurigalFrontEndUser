

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CheckoutInput from "./CheckoutInput";
import Text from "@/components/ui/Text";

import useAddress from "@/hooks/useAddress";

export default function CheckoutForm() {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [validationErrors, setValidationErrors] =
    useState({});

  const {
    formData,
    addresses,
    selectedAddress,
    setSelectedAddress,
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

  const shouldShowForm =
    addresses?.length === 0 ||
    showForm ||
    isEdit;

  // =========================
  // FIELD CHANGE HANDLER
  // =========================
  const handleFieldChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    handleChange({
      target: {
        name,
        value:
          type === "checkbox"
            ? checked
            : value,
      },
    });

    // Clear error while typing
    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================
  // CONTINUE PAYMENT
  // =========================
  const handleContinuePayment = () => {
    if (!selectedAddress) {
      alert(
        "Please select an address first"
      );
      return;
    }

    // Save selected address
    localStorage.setItem(
      "selected_address",
      JSON.stringify(selectedAddress)
    );

    router.push("/payment");
  };

  // =========================
  // ADDRESS SUBMIT
  // =========================
  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // =========================
    // FULL NAME
    // =========================
    if (!formData.full_name?.trim()) {
      newErrors.full_name =
        "Full Name is required";
    }

    // =========================
    // PHONE
    // =========================
    const cleanedPhone =
      formData.phone?.replace(/\D/g, "") ||
      "";

    if (!cleanedPhone) {
      newErrors.phone =
        "Phone Number is required";
    } else if (
      !/^[0-9]{10}$/.test(cleanedPhone)
    ) {
      newErrors.phone =
        "Phone Number must contain exactly 10 digits";
    }

    // =========================
    // EMAIL
    // =========================
    if (!formData.email?.trim()) {
      newErrors.email =
        "Email Address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    // =========================
    // ADDRESS
    // =========================
    const address =
      formData.address_line1?.trim() || "";

    if (!address) {
      newErrors.address_line1 =
        "Address Line 1 is required";
    } else if (address.length < 15) {
      newErrors.address_line1 =
        "Address must contain at least 15 characters";
    }

    // =========================
    // CITY
    // =========================
    if (!formData.city?.trim()) {
      newErrors.city =
        "City is required";
    }

    // =========================
    // STATE
    // =========================
    if (!formData.state?.trim()) {
      newErrors.state =
        "State is required";
    }

    // =========================
    // PINCODE
    // =========================
    if (!formData.pincode?.trim()) {
      newErrors.pincode =
        "PIN Code is required";
    } else if (
      !/^[0-9]{6}$/.test(
        formData.pincode
      )
    ) {
      newErrors.pincode =
        "PIN Code must be 6 digits";
    }

    // =========================
    // SHOW ERRORS
    // =========================
    setValidationErrors(newErrors);

    // STOP API CALL
    if (
      Object.keys(newErrors).length > 0
    )
      return;

    // =========================
    // API CALL
    // =========================
    const response = await handleSubmit(e);

    if (response !== false) {
      setShowForm(false);
      resetForm();
      setValidationErrors({});
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

      {/* =========================
          SAVED ADDRESSES
      ========================= */}
      {addresses?.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Text
              variant="h6"
              className="text-black"
            >
              Saved Addresses
            </Text>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(true);
                setSelectedAddress(null);
                setValidationErrors({});
              }}
              className="rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              + Add New Address
            </button>
          </div>

          <div className="space-y-4">
            {addresses.map((address) => {
              const isSelected =
                selectedAddress?.id ===
                address?.id;

              return (
                <div
                  key={address?.id}
                  onClick={() => {
                    setSelectedAddress(
                      address
                    );

                    localStorage.setItem(
                      "selected_address",
                      JSON.stringify(
                        address
                      )
                    );
                  }}
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    isSelected
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-black">
                        {
                          address?.full_name
                        }
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        {
                          address?.address_line1
                        }
                      </p>

                      <p className="text-sm text-gray-600">
                        {address?.city},{" "}
                        {address?.state} -{" "}
                        {
                          address?.pincode
                        }
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {address?.phone}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {address?.email}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowForm(
                            true
                          );
                          fetchAddress(
                            address?.id
                          );
                          setValidationErrors(
                            {}
                          );
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          deleteLoading
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(
                            address?.id
                          );
                        }}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedAddress && (
            <button
              type="button"
              onClick={
                handleContinuePayment
              }
              className="mt-6 h-12 w-full rounded-lg bg-green-500 text-sm font-semibold text-white hover:bg-green-600"
            >
              Continue To Payment →
            </button>
          )}
        </div>
      )}

      {/* =========================
          FORM
      ========================= */}
      {shouldShowForm && (
        <>
          {addresses?.length > 0 && (
            <div className="my-8 border-t pt-8" />
          )}

          <form
            onSubmit={
              handleAddressSubmit
            }
          >
            <div className="mb-5 flex items-center justify-between">
              <Text
                variant="h6"
                className="text-black"
              >
                {isEdit
                  ? "Edit Address"
                  : "Add New Address"}
              </Text>

              {addresses?.length >
                0 && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(
                      false
                    );
                    resetForm();
                    setValidationErrors(
                      {}
                    );
                  }}
                  className="text-sm font-medium text-red-500"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* FULL NAME */}
              <div>
                <CheckoutInput
                  label="Full Name *"
                  name="full_name"
                  value={
                    formData.full_name
                  }
                  onChange={
                    handleFieldChange
                  }
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    validationErrors.full_name
                  }
                </p>
              </div>

              {/* PHONE */}
              <div>
                <CheckoutInput
                  label="Phone Number *"
                  name="phone"
                  value={formData.phone}
                  maxLength={10}
                  onChange={(e) => {
                    const onlyNumbers =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    handleFieldChange({
                      target: {
                        name: "phone",
                        value:
                          onlyNumbers.slice(
                            0,
                            10
                          ),
                      },
                    });
                  }}
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    validationErrors.phone
                  }
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <CheckoutInput
                  label="Email Address *"
                  name="email"
                  value={
                    formData.email ||
                    ""
                  }
                  onChange={
                    handleFieldChange
                  }
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    validationErrors.email
                  }
                </p>
              </div>

              {/* ADDRESS */}
              <div>
                <CheckoutInput
                  label="Address Line 1 *"
                  name="address_line1"
                  value={
                    formData.address_line1
                  }
                  onChange={
                    handleFieldChange
                  }
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    validationErrors.address_line1
                  }
                </p>
              </div>

              {/* CITY */}
              <div>
                <CheckoutInput
                  label="City *"
                  name="city"
                  value={formData.city}
                  onChange={
                    handleFieldChange
                  }
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    validationErrors.city
                  }
                </p>
              </div>

              {/* STATE */}
              <div>
                <CheckoutInput
                  label="State *"
                  name="state"
                  value={
                    formData.state
                  }
                  onChange={
                    handleFieldChange
                  }
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    validationErrors.state
                  }
                </p>
              </div>

              {/* PINCODE */}
              <div>
                <CheckoutInput
                  label="PIN Code *"
                  name="pincode"
                  value={
                    formData.pincode
                  }
                  maxLength={6}
                  onChange={(e) => {
                    const onlyNumbers =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    handleFieldChange({
                      target: {
                        name: "pincode",
                        value:
                          onlyNumbers.slice(
                            0,
                            6
                          ),
                      },
                    });
                  }}
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    validationErrors.pincode
                  }
                </p>
              </div>

              {/* ADDRESS TYPE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address Type
                </label>

                <select
                  name="address_type"
                  value={
                    formData.address_type
                  }
                  onChange={
                    handleFieldChange
                  }
                  className="h-12 w-full rounded-lg border border-gray-300 px-3 text-sm"
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

              {/* DEFAULT ADDRESS */}
              <div className="flex items-center gap-3 pt-8">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={
                    formData.is_default
                  }
                  onChange={
                    handleFieldChange
                  }
                  className="h-4 w-4"
                />

                <label className="text-sm text-gray-700">
                  Set as default
                  address
                </label>
              </div>
            </div>

            {/* API ERROR */}
            {apiError && (
              <p className="mt-4 text-sm text-red-500">
                {apiError}
              </p>
            )}

            {/* SUCCESS */}
            {success && (
              <p className="mt-4 text-sm text-green-600">
              
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={
                submitLoading
              }
              className="mt-8 h-12 w-full rounded-lg bg-black text-sm font-semibold text-white hover:opacity-90 disabled:opacity-70"
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
        Need Help? Call us: +91
        98765 43210
      </p>
    </div>
  );
}