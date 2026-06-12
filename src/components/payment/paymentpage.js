
"use client";
 
import { useEffect, useState } from "react";
import Script from "next/script";
import PaymentSummary from "./ordersummery";
import useCheckout from "@/hooks/usecheckout";
import useCartSummary from "@/hooks/usecartsummary"; // 🌟 Import your new hook
 
export default function PaymentPageContent() {
  // 1. Your Checkout Hook
  const {
    cartItems,
    loading,
    orderLoading,
    paymentLoading,
    selectedAddress,
    placeOrder,
    initializeRazorpayPayment,
    verifyPaymentSignature,
    setCouponCode, // We use this to tell your backend which coupon was selected
  } = useCheckout();
 
  // 2. Your New Cart Summary Hook
  const cartSummaryHooks = useCartSummary();
  const { summary, selectedCoupon } = cartSummaryHooks;
 
  const [showModal, setShowModal] = useState(false);
 
  // 🌟 Sync the selected coupon from your new hook to your checkout hook
  // This ensures that when placeOrder() runs, it sends the coupon to your backend
  useEffect(() => {
    if (selectedCoupon?.coupon_code) {
      setCouponCode(selectedCoupon.coupon_code);
    } else {
      setCouponCode(null);
    }
  }, [selectedCoupon, setCouponCode]);
 
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }
    // We don't need to manually fetch the summary here anymore
    // because useCartSummary() already keeps it updated!
    setShowModal(true);
  };
 
  // ==========================================
  // FIXED RAZORPAY GATEWAY CHECKOUT PROCESS
  // ==========================================
  const handlePayNow = async () => {
    try {
      // 1. Create Internal Order (Backend will use the coupon we synced above)
      const order = await placeOrder();
      if (!order?.order_id) throw new Error("Order configuration failed. Tracking ID missing.");
 
      // 2. Fetch Razorpay Config (Backend calculates final discounted amount)
      const razorpayConfig = await initializeRazorpayPayment(order.order_id);
      if (!razorpayConfig?.razorpay_order_id) throw new Error("Failed to initialize remote gateway.");
 
      // 3. Configure Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayConfig.amount, // 🌟 Sent perfectly from backend with discount applied
        currency: razorpayConfig.currency || "INR",
        name: "Surgical World",
        description: `Order Purchase #${order.order_id.slice(0, 8)}`,
        order_id: razorpayConfig.razorpay_order_id,
       
        handler: async function (response) {
          try {
            const verificationPayload = {
              order_id: order.order_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
 
            const verificationResult = await verifyPaymentSignature(verificationPayload);
 
            if (verificationResult?.success) {
              setShowModal(false);
              alert("Payment Successful 🎉 Order Placed!");
            } else {
              alert(`Verification Error: ${verificationResult?.message}`);
            }
          } catch (err) {
            alert("Network dropped during confirmation.");
          }
        },
        prefill: {
          name: selectedAddress?.full_name || "Customer",
          contact: selectedAddress?.phone || "",
        },
        theme: { color: "#007595" },
      };
 
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          alert(`Transaction Declined: ${response.error.description}`);
        });
        rzp.open();
      } else {
        alert("Razorpay script failed to load.");
      }
 
    } catch (err) {
      console.error(err);
      alert(err?.message || "Payment initialization failed");
    }
  };
 
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* LEFT: CART ITEMS */}
      <div className="space-y-6 lg:col-span-2">
        {loading && <p>Loading cart...</p>}
        <div className="rounded-xl border p-4">
          <h2 className="mb-4 text-xl font-bold">Cart Items</h2>
          {(cartItems || []).map((item) => (
            <div key={item.cart_id} className="flex gap-4 border-b py-3">
              <img src={item.thumbnail_url} className="h-20 w-20 rounded object-cover" alt={item.name} />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
                <p className="font-medium">₹{item.sale_price}</p>
              </div>
            </div>
          ))}
        </div>
 
        <button
          onClick={handlePlaceOrder}
          disabled={orderLoading}
          className="w-full rounded-xl bg-[var(--color-text-primary)] p-3 text-white transition-colors disabled:opacity-50"
        >
          {orderLoading ? "Processing..." : "Place Order"}
        </button>
      </div>
 
      {/* RIGHT: PAYMENT SUMMARY */}
      <div>
        {/* 🌟 Pass the entire hook object down as props so they share the exact same state */}
        <PaymentSummary cartSummaryHooks={cartSummaryHooks} />
      </div>
 
      {/* MODAL: FINAL POPUP SUMMARY */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[420px] rounded-xl bg-white p-6">
            <h2 className="mb-6 text-xl font-bold text-center">Final Order Summary</h2>
           
            <div className="space-y-2 text-gray-700 mb-4">
              <p className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold">{summary?.total_items || 0}</span>
              </p>
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{Number(summary?.subtotal || 0).toLocaleString()}</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-semibold text-green-600">
                  {summary?.shipping_charge === 0 ? "Free" : `₹${summary?.shipping_charge || 0}`}
                </span>
              </p>
             
              {/* Only show this line if a coupon is actually applied */}
              {selectedCoupon && (
                <p className="flex justify-between text-green-600 font-medium bg-green-50 p-2 rounded">
                  <span>Discount ({selectedCoupon.coupon_code}):</span>
                  <span>-₹{summary?.discount_amount || 0}</span>
                </p>
              )}
            </div>
 
            <hr className="my-4" />
           
            <p className="flex justify-between text-2xl font-bold text-black mb-6">
              <span>Payable:</span>
              <span>₹{Number(summary?.total_amount || 0).toLocaleString()}</span>
            </p>
 
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/3 rounded-lg bg-gray-200 p-3 font-medium text-black transition hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePayNow}
                disabled={paymentLoading}
                className="w-2/3 rounded-lg bg-[var(--color-text-primary)] p-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
              >
                {paymentLoading ? "Connecting Gateway..." : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      )}
 
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </div>
  );
}
 