// "use client";

// import Text from "@/components/ui/Text";
// import Button from "@/components/ui/Button";

// export default function CartSummary({
//   summary,
// }) {
//   return (
//     <div className="sticky top-24 rounded-2xl border bg-white p-6">
//       <Text
//         variant="h4"
//         className="mb-5 text-black"
//       >
//         Order Summary
//       </Text>

//       <div className="space-y-4">
//         <div className="flex justify-between">
//           <Text>Items</Text>

//           <Text>
//             {
//               summary.total_items
//             }
//           </Text>
//         </div>

//         <div className="flex justify-between">
//           <Text>
//             Subtotal
//           </Text>

//           <Text>
//             ₹
//             {(
//               summary.subtotal ||
//               0
//             ).toLocaleString()}
//           </Text>
//         </div>

//         <div className="border-t pt-4 flex justify-between">
//           <Text
//             variant="h5"
//             className="text-black"
//           >
//             Total
//           </Text>

//           <Text
//             variant="h5"
//             className="text-text-primary"
//           >
//             ₹
//             {(
//               summary.subtotal ||
//               0
//             ).toLocaleString()}
//           </Text>
//         </div>
//       </div>

//       <Button className="mt-6 w-full">
//         Proceed To Checkout
//       </Button>
//     </div>
//   );
// }




"use client";

import { useRouter } from "next/navigation";

import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

export default function CartSummary({
  summary,
}) {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-6">
      <Text
        variant="h4"
        className="mb-5 text-black"
      >
        Order Summary
      </Text>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Text>Items</Text>

          <Text>
            {summary.total_items}
          </Text>
        </div>

        <div className="flex justify-between">
          <Text>
            Subtotal
          </Text>

          <Text>
            ₹
            {(
              summary.subtotal ||
              0
            ).toLocaleString()}
          </Text>
        </div>

        <div className="flex justify-between border-t pt-4">
          <Text
            variant="h5"
            className="text-black"
          >
            Total
          </Text>

          <Text
            variant="h5"
            className="text-text-primary"
          >
            ₹
            {(
              summary.subtotal ||
              0
            ).toLocaleString()}
          </Text>
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        onClick={handleCheckout}
      >
        Proceed To Checkout
      </Button>
    </div>
  );
}