// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Trash2, ShoppingCart } from "lucide-react";
// import Text from "@/components/ui/Text";

// // ✅ CART HOOK
// import useCart from "@/hooks/useCart";

// export default function WishlistCard({
//   product,
//   removeFromWishlist,
// }) {
//   const { addCart } = useCart();

//   // REMOVE
//   const handleRemove = async (e) => {
//     e.preventDefault();

//     if (removeFromWishlist) {
//       await removeFromWishlist(product.product_id);
//     }
//   };

//   // ADD TO CART
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     await addCart(product.product_id, 1);
//   };

//   // SAFE IMAGE
//   const imageSrc =
//     product?.thumbnail_url &&
//     typeof product.thumbnail_url === "string" &&
//     product.thumbnail_url.startsWith("http") &&
//     !product.thumbnail_url.includes("::")
//       ? product.thumbnail_url
//       : "/images/product-placeholder.png";

//   return (
//     <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">

//       {/* IMAGE */}
//       <Link href={`/products/${product.product_id}`}>
//         <div className="relative aspect-square bg-slate-100">
//           <Image
//             src={imageSrc}
//             alt={product.name || "Product"}
//             fill
//             className="object-cover"
//           />
//         </div>
//       </Link>

//       {/* CONTENT */}
//       <div className="p-4">
//         <Text variant="bodySmall" className="text-[var(--color-text-primary)]">
//           {product.category_name}
//         </Text>

//         <Text variant="h6" className="mt-1 line-clamp-2">
//           {product.name}
//         </Text>

//         <div className="mt-3 flex items-center gap-2">
//           <Text className="font-semibold text-green-600">
//             ₹{product.sale_price}
//           </Text>

//           <Text className="text-sm text-gray-400 line-through">
//             ₹{product.mrp}
//           </Text>
//         </div>

//         {/* ACTIONS */}
//         <div className="mt-4 flex gap-2">

//           {/* ADD TO CART */}
//           <button
//             onClick={handleAddToCart}
//             className="flex-1 rounded-lg bg-[var(--color-text-primary)] py-2 text-white hover:opacity-90 transition"
//             title="Add to cart"
//           >
//             <ShoppingCart size={16} className="mx-auto" />
//           </button>

//           {/* REMOVE */}
//           <button
//             onClick={handleRemove}
//             className="rounded-lg border px-3 text-red-500 hover:bg-red-50 transition"
//             title="Remove from wishlist"
//           >
//             <Trash2 size={16} />
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }








"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";
import Text from "@/components/ui/Text";

import useCart from "@/hooks/useCart";

export default function WishlistCard({
  product,
  removeFromWishlist,
}) {
  const { addCart } = useCart();

  // =========================
  // REMOVE (USE wishlist_id — CORRECT FOR YOUR API)
  // =========================
  const handleRemove = async (e) => {
    e.preventDefault();

    if (removeFromWishlist) {
      await removeFromWishlist(product?.product_id);
    }
  };

  // =========================
  // ADD TO CART (USE product_id)
  // =========================
  const handleAddToCart = async (e) => {
    e.preventDefault();
    await addCart(product?.product_id, 1);
  };

  // =========================
  // SAFE IMAGE
  // =========================
  const imageSrc =
    product?.thumbnail_url &&
    typeof product.thumbnail_url === "string" &&
    product.thumbnail_url.startsWith("http") &&
    !product.thumbnail_url.includes("::")
      ? product.thumbnail_url
      : "/images/product-placeholder.png";

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">

      {/* IMAGE */}
      <Link href={`/products/${product?.product_id}`}>
        <div className="relative aspect-square bg-slate-100 overflow-hidden">

          <Image
            src={imageSrc}
            alt={product?.name || "Product"}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />

          {/* STOCK BADGE */}
          <div className="absolute left-2 top-2">
            <span
              className={`rounded-full px-2 py-1 text-xs text-white ${
                product?.stock_status === "In Stock"
                  ? "bg-green-600"
                  : "bg-red-500"
              }`}
            >
              {product?.stock_status}
            </span>
          </div>

          {/* DISCOUNT BADGE */}
          {product?.discount_percentage > 0 && (
            <div className="absolute right-2 top-2">
              <span className="rounded-full bg-black px-2 py-1 text-xs text-white">
                {product?.discount_percentage}% OFF
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4">

        {/* NAME */}
        <Text variant="h6" className="mt-1 line-clamp-2">
          {product?.name}
        </Text>

        {/* BRAND + SKU */}
        <div className="mt-1 text-xs text-gray-500">
          <p>Brand: {product?.brand}</p>
          <p>SKU: {product?.sku}</p>
        </div>

        {/* RATING */}
        <div className="mt-2 text-xs text-gray-500">
          ⭐ {product?.rating || 0} ({product?.review_count || 0})
        </div>

        {/* PRICE */}
        <div className="mt-3 flex items-center gap-2">
          <Text className="font-semibold text-green-600">
            ₹{Number(product?.sale_price || 0).toLocaleString()}
          </Text>

          <Text className="text-sm text-gray-400 line-through">
            ₹{Number(product?.mrp || 0).toLocaleString()}
          </Text>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex gap-2">

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-lg bg-[var(--color-text-primary)] py-2 text-white transition hover:opacity-90"
          >
            <ShoppingCart size={16} className="mx-auto" />
          </button>

          {/* REMOVE */}
          <button
            onClick={handleRemove}
            className="rounded-lg border px-3 text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>
    </div>
  );
}


