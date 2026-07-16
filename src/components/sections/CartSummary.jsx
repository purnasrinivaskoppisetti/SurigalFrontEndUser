"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

export default function CartSummary({ summary }) {
  const router = useRouter();

  // Grab the user from Redux to check authentication
  const user = useSelector((state) => state.user?.user);

  const handleCheckout = () => {
    // Force the window to scroll to the top instantly before routing
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    if (!user?.id) {
      // User is a guest. Add query param to trigger AuthHandler
      router.push("?auth=checkout");
    } else {
      // User is logged in. Proceed directly to checkout
      router.push("/checkout");
    }
  };

  return (
    <div className="lg:sticky lg:top-24 rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs">
      <Text variant="h4" className="mb-5 text-black font-bold text-lg sm:text-xl">
        Order Summary
      </Text>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm sm:text-base">
          <Text className="text-gray-600">Items</Text>
          <Text className="font-medium text-black">{summary.total_items}</Text>
        </div>

        <div className="flex justify-between items-center text-sm sm:text-base">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="font-medium text-black">
            ₹{(summary.subtotal || 0).toLocaleString("en-IN")}
          </Text>
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <Text variant="h5" className="text-black font-bold">
            Total
          </Text>

          <Text variant="h5" className="text-text-primary font-bold text-lg">
            ₹{(summary.subtotal || 0).toLocaleString("en-IN")}
          </Text>
        </div>
      </div>

      <Button 
        className="mt-6 w-full h-12 rounded-xl text-sm font-semibold shadow-xs transition active:scale-[0.99]" 
        onClick={handleCheckout}
      >
        Proceed To Checkout
      </Button>
    </div>
  );
}