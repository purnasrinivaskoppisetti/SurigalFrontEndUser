"use client";

import { useEffect, useState } from "react";
import PaymentSummary from "./ordersummery";
import useCheckout from "@/hooks/usecheckout";

export default function PaymentPageContent() {
  const {
    cartItems,
    loading,
    orderLoading,
    paymentLoading,
    selectedAddress,
    placeOrder,
    handlePaymentSuccess,
    getCartSummary,
  } = useCheckout();

  // ======================
  // LOCAL STATE
  // ======================
  const [showModal, setShowModal] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // ======================
  // BEST COUPON AUTO SELECT
  // ======================
  useEffect(() => {
    if (summaryData?.available_coupons?.length) {
      const best = [...summaryData.available_coupons].sort(
        (a, b) => b.discount_amount - a.discount_amount
      )[0];

      setSelectedCoupon(best);
    }
  }, [summaryData]);

  // ======================
  // LOAD SUMMARY
  // ======================
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    const res = await getCartSummary();

    const summary = res?.data?.data || res?.data;

    setSummaryData(summary);
    setShowModal(true);
  };

  // ======================
  // PAY NOW (FIXED FLOW)
  // ======================
  const handlePayNow = async () => {
    try {
      // 1. CREATE ORDER
      const order = await placeOrder();

      if (!order?.order_id) {
        throw new Error("Order ID not found");
      }

      // 2. TRANSACTION ID
      const transactionId = `TXN-${Date.now()}`;

      // 3. PAYMENT API CALL
      await handlePaymentSuccess({
        order_id: order.order_id,
        transaction_id: transactionId,
        amount:
          selectedCoupon?.payable_amount ||
          summaryData?.total_amount ||
          0,
        payment_method: "COD",
      });

      setShowModal(false);

      alert("Payment Successful 🎉 Order Placed!");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Payment failed");
    }
  };

  const payableAmount =
    selectedCoupon?.payable_amount ??
    summaryData?.total_amount ??
    0;

  return (
    <div className="grid gap-8 lg:grid-cols-3">

      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">

        {loading && <p>Loading cart...</p>}

        <div className="border p-4 rounded-xl">
          <h2 className="font-bold text-xl mb-4">Cart Items</h2>

          {(cartItems || []).map((item) => (
            <div key={item.cart_id} className="flex gap-4 border-b py-3">

              <img
                src={item.thumbnail_url}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.sale_price}</p>
              </div>

            </div>
          ))}
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={orderLoading}
          className="w-full bg-black text-white p-3 rounded-xl"
        >
          {orderLoading ? "Processing..." : "Place Order"}
        </button>

      </div>

      {/* RIGHT */}
      <div>
        <PaymentSummary
          amount={payableAmount}
          totalItems={summaryData?.total_items || 0}
        />
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[420px]">

            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <p>Items: {summaryData?.total_items}</p>
            <p>Subtotal: ₹{summaryData?.subtotal}</p>

            <p className="text-green-600">
              Discount: ₹{selectedCoupon?.discount_amount || 0}
            </p>

            <hr className="my-2" />

            <p className="text-lg font-bold">
              Payable: ₹{payableAmount}
            </p>

            <button
              onClick={handlePayNow}
              disabled={paymentLoading}
              className="w-full mt-4 bg-green-600 text-white p-3 rounded-lg"
            >
              {paymentLoading ? "Processing..." : "Pay Now"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}