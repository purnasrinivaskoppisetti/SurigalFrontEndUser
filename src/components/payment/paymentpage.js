


// "use client";

// import { useEffect, useState } from "react";
// import Script from "next/script";

// import PaymentSummary from "./ordersummery";

// import useCheckout from "@/hooks/usecheckout";
// import useCartSummary from "@/hooks/usecartsummary";

// export default function PaymentPageContent() {

//   // ==========================================
//   // CHECKOUT HOOK
//   // ==========================================
//   const {
//     cartItems,
//     loading,
//     orderLoading,
//     paymentLoading,
//     selectedAddress,

//     placeOrder,
//     initializeRazorpayPayment,
//     verifyPaymentSignature,

//     setCouponCode,
//   } = useCheckout();

//   // ==========================================
//   // CART SUMMARY HOOK
//   // ==========================================
//   const cartSummaryHooks = useCartSummary();

//   const {
//     summary,
//     selectedCoupon,
//   } = cartSummaryHooks;

//   // ==========================================
//   // STATE
//   // ==========================================
//   const [showModal, setShowModal] = useState(false);

//   // ==========================================
//   // SYNC COUPON TO CHECKOUT
//   // ==========================================
//   useEffect(() => {

//     if (selectedCoupon?.coupon_code) {
//       setCouponCode(selectedCoupon.coupon_code);
//     } else {
//       setCouponCode(null);
//     }

//   }, [selectedCoupon, setCouponCode]);

//   // ==========================================
//   // PLACE ORDER
//   // ==========================================
//   const handlePlaceOrder = () => {

//     if (!selectedAddress) {
//       alert("Please select an address");
//       return;
//     }

//     setShowModal(true);
//   };

//   // ==========================================
//   // PAYMENT FLOW
//   // ==========================================
//   const handlePayNow = async () => {

//     try {

//       // ==========================================
//       // CREATE INTERNAL ORDER
//       // ==========================================
//       const order = await placeOrder();

//       console.log("ORDER:", order);

//       if (!order?.order_id) {
//         throw new Error("Order creation failed");
//       }

//       // ==========================================
//       // INITIALIZE RAZORPAY PAYMENT
//       // ==========================================
//       const razorpayConfig =
//         await initializeRazorpayPayment(order.order_id);

//       console.log("RAZORPAY CONFIG:", razorpayConfig);

//       if (!razorpayConfig?.razorpay_order_id) {
//         throw new Error("Failed to initialize payment");
//       }

//       // ==========================================
//       // MOBILE DEVICE CHECK
//       // ==========================================
//       const isMobile =
//         /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

//       // ==========================================
//       // RAZORPAY OPTIONS
//       // ==========================================
//       const options = {

//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

//         amount: razorpayConfig.amount,

//         currency:
//           razorpayConfig.currency || "INR",

//         name: "Surgical World",

//         description:
//           `Order #${order.order_id.slice(0, 8)}`,

//         order_id:
//           razorpayConfig.razorpay_order_id,

//         // ==========================================
//         // PAYMENT SUCCESS
//         // ==========================================
//         handler: async function (response) {

//           try {

//             const verificationPayload = {

//               order_id: order.order_id,

//               razorpay_order_id:
//                 response.razorpay_order_id,

//               razorpay_payment_id:
//                 response.razorpay_payment_id,

//               razorpay_signature:
//                 response.razorpay_signature,
//             };

//             console.log(
//               "VERIFY PAYLOAD:",
//               verificationPayload
//             );

//             const verificationResult =
//               await verifyPaymentSignature(
//                 verificationPayload
//               );

//             console.log(
//               "VERIFY RESULT:",
//               verificationResult
//             );

//             if (verificationResult?.success) {

//               setShowModal(false);

//               alert(
//                 "Payment Successful 🎉"
//               );

//             } else {

//               alert(
//                 verificationResult?.message ||
//                 "Verification failed"
//               );
//             }

//           } catch (err) {

//             console.error(err);

//             alert(
//               "Payment verification failed"
//             );
//           }
//         },

//         // ==========================================
//         // PREFILL
//         // ==========================================
//         prefill: {

//           name:
//             selectedAddress?.full_name ||
//             "Customer",

//           contact:
//             selectedAddress?.phone ||
//             "",
//         },

//         // ==========================================
//         // THEME
//         // ==========================================
//         theme: {
//           color: "#007595",
//         },

//         // ==========================================
//         // UPI SUPPORT
//         // ==========================================
//         method: {
//           upi: true,
//           card: true,
//           netbanking: true,
//           wallet: true,
//         },

//         // ==========================================
//         // MOBILE GPAY REDIRECT FIX
//         // ==========================================
//         upi: {
//           flow: isMobile
//             ? "intent"
//             : "collect",
//         },

//         // ==========================================
//         // MODAL SETTINGS
//         // ==========================================
//         modal: {

//           ondismiss: function () {
//             console.log(
//               "Payment popup closed"
//             );
//           },
//         },

//         // ==========================================
//         // RETRY
//         // ==========================================
//         retry: {
//           enabled: true,
//           max_count: 2,
//         },
//       };

//       // ==========================================
//       // OPEN RAZORPAY
//       // ==========================================
//       if (window.Razorpay) {

//         const rzp =
//           new window.Razorpay(options);

//         // ==========================================
//         // PAYMENT FAILED
//         // ==========================================
//         rzp.on(
//           "payment.failed",
//           function (response) {

//             console.error(
//               "PAYMENT FAILED:",
//               response
//             );

//             alert(
//               response?.error?.description ||
//               "Payment failed"
//             );
//           }
//         );

//         rzp.open();

//       } else {

//         alert(
//           "Razorpay SDK failed to load"
//         );
//       }

//     } catch (err) {

//       console.error(err);

//       alert(
//         err?.message ||
//         "Payment initialization failed"
//       );
//     }
//   };

//   return (

//     <div className="grid gap-8 lg:grid-cols-3">

//       {/* ==========================================
//           LEFT SECTION
//       ========================================== */}
//       <div className="space-y-6 lg:col-span-2">

//         {/* LOADING */}
//         {loading && (
//           <p>Loading cart...</p>
//         )}

//         {/* CART */}
//         <div className="rounded-xl border p-4">

//           <h2 className="mb-4 text-xl font-bold">
//             Cart Items
//           </h2>

//           {(cartItems || []).map((item) => (

//             <div
//               key={item.cart_id}
//               className="flex gap-4 border-b py-3"
//             >

//               <img
//                 src={item.thumbnail_url}
//                 alt={item.name}
//                 className="h-20 w-20 rounded object-cover"
//               />

//               <div>

//                 <p className="font-semibold">
//                   {item.name}
//                 </p>

//                 <p className="text-gray-600">
//                   Qty: {item.quantity}
//                 </p>

//                 <p className="font-medium">
//                   ₹{item.sale_price}
//                 </p>

//               </div>

//             </div>
//           ))}
//         </div>

//         {/* PLACE ORDER */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={orderLoading}
//           className="
//             w-full
//             rounded-xl
//             bg-[var(--color-text-primary)]
//             p-3
//             text-white
//             transition-all
//             duration-300
//             hover:opacity-90
//             disabled:opacity-50
//           "
//         >

//           {orderLoading
//             ? "Processing..."
//             : "Place Order"}

//         </button>
//       </div>

//       {/* ==========================================
//           RIGHT SECTION
//       ========================================== */}
//       <div>

//         <PaymentSummary
//           cartSummaryHooks={cartSummaryHooks}
//         />

//       </div>

//       {/* ==========================================
//           MODAL
//       ========================================== */}
//       {showModal && (

//         <div className="
//           fixed inset-0 z-50
//           flex items-center justify-center
//           bg-black/60
//           p-4
//         ">

//           <div className="
//             w-full max-w-[420px]
//             rounded-xl
//             bg-white
//             p-6
//           ">

//             <h2 className="
//               mb-6
//               text-center
//               text-xl
//               font-bold
//             ">
//               Final Order Summary
//             </h2>

//             {/* SUMMARY */}
//             <div className="
//               mb-4
//               space-y-2
//               text-gray-700
//             ">

//               <p className="flex justify-between">
//                 <span>Total Items:</span>
//                 <span className="font-semibold">
//                   {summary?.total_items || 0}
//                 </span>
//               </p>

//               <p className="flex justify-between">
//                 <span>Subtotal:</span>
//                 <span className="font-semibold">
//                   ₹{Number(
//                     summary?.subtotal || 0
//                   ).toLocaleString()}
//                 </span>
//               </p>

//               <p className="flex justify-between">
//                 <span>Delivery:</span>

//                 <span className="
//                   font-semibold
//                   text-green-600
//                 ">

//                   {summary?.shipping_charge === 0
//                     ? "Free"
//                     : `₹${summary?.shipping_charge || 0}`}

//                 </span>
//               </p>

//               {/* DISCOUNT */}
//               {selectedCoupon && (

//                 <p className="
//                   flex justify-between
//                   rounded
//                   bg-green-50
//                   p-2
//                   font-medium
//                   text-green-600
//                 ">

//                   <span>
//                     Discount (
//                     {selectedCoupon.coupon_code}
//                     ):
//                   </span>

//                   <span>
//                     -₹{summary?.discount_amount || 0}
//                   </span>

//                 </p>
//               )}
//             </div>

//             <hr className="my-4" />

//             {/* TOTAL */}
//             <p className="
//               mb-6
//               flex justify-between
//               text-2xl
//               font-bold
//               text-black
//             ">

//               <span>Payable:</span>

//               <span>
//                 ₹{Number(
//                   summary?.total_amount || 0
//                 ).toLocaleString()}
//               </span>

//             </p>

//             {/* BUTTONS */}
//             <div className="mt-4 flex gap-3">

//               {/* CANCEL */}
//               <button
//                 onClick={() =>
//                   setShowModal(false)
//                 }
//                 className="
//                   w-1/3
//                   rounded-lg
//                   bg-gray-200
//                   p-3
//                   font-medium
//                   text-black
//                   transition-all
//                   duration-300
//                   hover:bg-gray-300
//                 "
//               >
//                 Cancel
//               </button>

//               {/* PAY NOW */}
//               <button
//                 onClick={handlePayNow}
//                 disabled={paymentLoading}
//                 className="
//                   w-2/3
//                   rounded-lg
//                   bg-[var(--color-text-primary)]
//                   p-3
//                   font-bold
//                   text-white
//                   transition-all
//                   duration-300
//                   hover:opacity-90
//                   disabled:opacity-50
//                 "
//               >

//                 {paymentLoading
//                   ? "Connecting Gateway..."
//                   : "Pay Now"}

//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* ==========================================
//           RAZORPAY SCRIPT
//       ========================================== */}
//       <Script
//         src="https://checkout.razorpay.com/v1/checkout.js"
//         strategy="lazyOnload"
//       />

//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

import PaymentSummary from "./ordersummery";
import PaymentSuccessModal from "./paymentsuscessmodel";

import useCheckout from "@/hooks/usecheckout";
import useCartSummary from "@/hooks/usecartsummary";

export default function PaymentPageContent() {

  const router = useRouter();

  // ==========================================
  // CHECKOUT HOOK
  // ==========================================
  const {
    cartItems,
    loading,
    orderLoading,
    paymentLoading,
    selectedAddress,

    placeOrder,
    initializeRazorpayPayment,
    verifyPaymentSignature,

    setCouponCode,
  } = useCheckout();

  // ==========================================
  // CART SUMMARY HOOK
  // ==========================================
  const cartSummaryHooks = useCartSummary();

  const {
    summary,
    selectedCoupon,
  } = cartSummaryHooks;

  // ==========================================
  // STATE
  // ==========================================
  const [showModal, setShowModal] = useState(false);

  // 👇 new: success modal state
  const [successModal, setSuccessModal] = useState({
    show: false,
    message: "",
  });

  // ==========================================
  // SYNC COUPON TO CHECKOUT
  // ==========================================
  useEffect(() => {

    if (selectedCoupon?.coupon_code) {
      setCouponCode(selectedCoupon.coupon_code);
    } else {
      setCouponCode(null);
    }

  }, [selectedCoupon, setCouponCode]);

  // ==========================================
  // PLACE ORDER
  // ==========================================
  const handlePlaceOrder = () => {

    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    setShowModal(true);
  };

  // ==========================================
  // PAYMENT FLOW
  // ==========================================
  const handlePayNow = async () => {

    try {

      // ==========================================
      // CREATE INTERNAL ORDER
      // ==========================================
      const order = await placeOrder();

      console.log("ORDER:", order);

      if (!order?.order_id) {
        throw new Error("Order creation failed");
      }

      // ==========================================
      // INITIALIZE RAZORPAY PAYMENT
      // ==========================================
      const razorpayConfig =
        await initializeRazorpayPayment(order.order_id);

      console.log("RAZORPAY CONFIG:", razorpayConfig);

      if (!razorpayConfig?.razorpay_order_id) {
        throw new Error("Failed to initialize payment");
      }

      // ==========================================
      // MOBILE DEVICE CHECK
      // ==========================================
      const isMobile =
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      // ==========================================
      // RAZORPAY OPTIONS
      // ==========================================
      const options = {

        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: razorpayConfig.amount,

        currency:
          razorpayConfig.currency || "INR",

        name: "Surgical World",

        description:
          `Order #${order.order_id.slice(0, 8)}`,

        order_id:
          razorpayConfig.razorpay_order_id,

        // ==========================================
        // PAYMENT SUCCESS
        // ==========================================
        handler: async function (response) {

          try {

            const verificationPayload = {

              order_id: order.order_id,

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            };

            console.log(
              "VERIFY PAYLOAD:",
              verificationPayload
            );

            const verificationResult =
              await verifyPaymentSignature(
                verificationPayload
              );

            console.log(
              "VERIFY RESULT:",
              verificationResult
            );

            if (verificationResult?.success) {

              setShowModal(false);

              // 👇 show the animated success modal instead of alert
              setSuccessModal({
                show: true,
                message:
                  verificationResult?.message ||
                  "Your payment was successful.",
              });

            } else {

              alert(
                verificationResult?.message ||
                "Verification failed"
              );
            }

          } catch (err) {

            console.error(err);

            alert(
              err?.response?.data?.message ||
              "Payment verification failed"
            );
          }
        },

        // ==========================================
        // PREFILL
        // ==========================================
        prefill: {

          name:
            selectedAddress?.full_name ||
            "Customer",

          contact:
            selectedAddress?.phone ||
            "",
        },

        // ==========================================
        // THEME
        // ==========================================
        theme: {
          color: "#007595",
        },

        // ==========================================
        // UPI SUPPORT
        // ==========================================
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        // ==========================================
        // MOBILE GPAY REDIRECT FIX
        // ==========================================
        upi: {
          flow: isMobile
            ? "intent"
            : "collect",
        },

        // ==========================================
        // MODAL SETTINGS
        // ==========================================
        modal: {

          ondismiss: function () {
            console.log(
              "Payment popup closed"
            );
          },
        },

        // ==========================================
        // RETRY
        // ==========================================
        retry: {
          enabled: true,
          max_count: 2,
        },
      };

      // ==========================================
      // OPEN RAZORPAY
      // ==========================================
      if (window.Razorpay) {

        const rzp =
          new window.Razorpay(options);

        // ==========================================
        // PAYMENT FAILED
        // ==========================================
        rzp.on(
          "payment.failed",
          function (response) {

            console.error(
              "PAYMENT FAILED:",
              response
            );

            alert(
              response?.error?.description ||
              "Payment failed"
            );
          }
        );

        rzp.open();

      } else {

        alert(
          "Razorpay SDK failed to load"
        );
      }

    } catch (err) {

      console.error(err);

      alert(
        err?.message ||
        "Payment initialization failed"
      );
    }
  };

  return (

    <div className="grid gap-8 lg:grid-cols-3">

      {/* ==========================================
          LEFT SECTION
      ========================================== */}
      <div className="space-y-6 lg:col-span-2">

        {/* LOADING */}
        {loading && (
          <p>Loading cart...</p>
        )}

        {/* CART */}
        <div className="rounded-xl border p-4">

          <h2 className="mb-4 text-xl font-bold">
            Cart Items
          </h2>

          {(cartItems || []).map((item) => (

            <div
              key={item.cart_id}
              className="flex gap-4 border-b py-3"
            >

              <img
                src={item.thumbnail_url}
                alt={item.name}
                className="h-20 w-20 rounded object-cover"
              />

              <div>

                <p className="font-semibold">
                  {item.name}
                </p>

                <p className="text-gray-600">
                  Qty: {item.quantity}
                </p>

                <p className="font-medium">
                  ₹{item.sale_price}
                </p>

              </div>

            </div>
          ))}
        </div>

        {/* PLACE ORDER */}
        <button
          onClick={handlePlaceOrder}
          disabled={orderLoading}
          className="
            w-full
            rounded-xl
            bg-[var(--color-text-primary)]
            p-3
            text-white
            transition-all
            duration-300
            hover:opacity-90
            disabled:opacity-50
          "
        >

          {orderLoading
            ? "Processing..."
            : "Place Order"}

        </button>
      </div>

      {/* ==========================================
          RIGHT SECTION
      ========================================== */}
      <div>

        <PaymentSummary
          cartSummaryHooks={cartSummaryHooks}
        />

      </div>

      {/* ==========================================
          MODAL
      ========================================== */}
      {showModal && (

        <div className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/60
          p-4
        ">

          <div className="
            w-full max-w-[420px]
            rounded-xl
            bg-white
            p-6
          ">

            <h2 className="
              mb-6
              text-center
              text-xl
              font-bold
            ">
              Final Order Summary
            </h2>

            {/* SUMMARY */}
            <div className="
              mb-4
              space-y-2
              text-gray-700
            ">

              <p className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold">
                  {summary?.total_items || 0}
                </span>
              </p>

              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  ₹{Number(
                    summary?.subtotal || 0
                  ).toLocaleString()}
                </span>
              </p>

              <p className="flex justify-between">
                <span>Delivery:</span>

                <span className="
                  font-semibold
                  text-green-600
                ">

                  {summary?.shipping_charge === 0
                    ? "Free"
                    : `₹${summary?.shipping_charge || 0}`}

                </span>
              </p>

              {/* DISCOUNT */}
              {selectedCoupon && (

                <p className="
                  flex justify-between
                  rounded
                  bg-green-50
                  p-2
                  font-medium
                  text-green-600
                ">

                  <span>
                    Discount (
                    {selectedCoupon.coupon_code}
                    ):
                  </span>

                  <span>
                    -₹{summary?.discount_amount || 0}
                  </span>

                </p>
              )}
            </div>

            <hr className="my-4" />

            {/* TOTAL */}
            <p className="
              mb-6
              flex justify-between
              text-2xl
              font-bold
              text-black
            ">

              <span>Payable:</span>

              <span>
                ₹{Number(
                  summary?.total_amount || 0
                ).toLocaleString()}
              </span>

            </p>

            {/* BUTTONS */}
            <div className="mt-4 flex gap-3">

              {/* CANCEL */}
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  w-1/3
                  rounded-lg
                  bg-gray-200
                  p-3
                  font-medium
                  text-black
                  transition-all
                  duration-300
                  hover:bg-gray-300
                "
              >
                Cancel
              </button>

              {/* PAY NOW */}
              <button
                onClick={handlePayNow}
                disabled={paymentLoading}
                className="
                  w-2/3
                  rounded-lg
                  bg-[var(--color-text-primary)]
                  p-3
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:opacity-90
                  disabled:opacity-50
                "
              >

                {paymentLoading
                  ? "Connecting Gateway..."
                  : "Pay Now"}

              </button>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          SUCCESS MODAL WITH CONFETTI
      ========================================== */}
      {successModal.show && (
        <PaymentSuccessModal
          message={successModal.message}
          onClose={() => {
            setSuccessModal({ show: false, message: "" });
            router.push("/orders");
          }}
        />
      )}

      {/* ==========================================
          RAZORPAY SCRIPT
      ========================================== */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

    </div>
  );
}