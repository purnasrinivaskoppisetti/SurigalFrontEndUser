// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   Heart,
//   ShoppingCart,
//   Star,
// } from "lucide-react";

// import { useState } from "react";

// import Text from "@/components/ui/Text";
// import { AuthModal } from "@/components";

// import useWishlist from "@/hooks/useWishlist";
// import useCart from "@/hooks/useCart";

// export default function ProductCard({ product }) {
//   const [isAuthOpen, setIsAuthOpen] = useState(false);
//   const [addingCart, setAddingCart] = useState(false);

//   const { addCart } = useCart();

//   const {
//     addToWishlist,
//     removeFromWishlist,
//     isWishlisted,
//   } = useWishlist();

//   const user = true;

//   const id = product?.id;

//   const imageUrl =
//     product?.thumbnail_url ||
//     product?.images?.[0]?.image_url ||
//     "/images/product-placeholder.png";

//   // ❤️ Wishlist
//   const handleWishlist = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!user) {
//       setIsAuthOpen(true);
//       return;
//     }

//     try {
//       if (isWishlisted(id)) {
//         await removeFromWishlist(id);
//       } else {
//         await addToWishlist(id);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // 🛒 Add Cart
//   const handleCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!user) {
//       setIsAuthOpen(true);
//       return;
//     }

//     if (addingCart) return;

//     try {
//       setAddingCart(true);

//       await addCart(id, 1);

//       console.log("Added to cart");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setAddingCart(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className="
//           group flex flex-col overflow-hidden
//           rounded-lg border bg-white shadow-sm
//           transition hover:shadow-md
//         "
//       >
//         {/* IMAGE */}
//         <Link href={`/products/${id}`}>
//           <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-100 overflow-hidden">

//             <Image
//               src={imageUrl}
//               alt={product?.name || "Product"}
//               fill
//               sizes="(max-width: 768px) 100vw, 33vw"
//                     className="object-contain p-1 transition-transform group-hover:scale-105"

//             />

//             {/* ❤️ Wishlist */}
//             <button
//               onClick={handleWishlist}
//               className="
//                 absolute right-2 top-2
//                 flex h-8 w-8 items-center justify-center
//                 rounded-full bg-white shadow
//               "
//             >
//               <Heart
//                 size={14}
//                 className={
//                   isWishlisted(id)
//                     ? "fill-red-500 text-red-500"
//                     : "text-gray-500"
//                 }
//               />
//             </button>
//           </div>
//         </Link>

//         {/* CONTENT */}
//         <div className="p-3 sm:p-4">

//           {/* NAME */}
//           <Link href={`/products/${id}`}>
//             <h3 className="text-sm sm:text-base font-semibold line-clamp-2 hover:text-[var(--color-text-primary)] transition">
//               {product?.name}
//             </h3>
//           </Link>

//           {/* RATING */}
//           <div className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-gray-600">
//             <Star
//               size={12}
//               className="fill-yellow-500 text-yellow-500"
//             />

//             <span>
//               {product?.rating} ({product?.review_count})
//             </span>
//           </div>

//           {/* PRICE */}
//           <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
//             <span className="text-base sm:text-lg font-bold text-green-600">
//               ₹{product?.sale_price}
//             </span>

//             <span className="text-xs sm:text-sm text-gray-400 line-through">
//               ₹{product?.mrp}
//             </span>
//           </div>

//           {/* STOCK */}
//           <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
//             {product?.stock_status} • {product?.stock_qty} left
//           </p>

//           {/* ACTIONS */}
//           <div className="mt-3 flex gap-2">

//             {/* ADD CART */}
//             <button
//               onClick={handleCart}
//               disabled={addingCart}
//               className="
//                 flex flex-1 items-center justify-center gap-2
//                 rounded-md bg-[var(--color-text-primary)]
//                 py-2 text-xs sm:text-sm text-white
//                 transition active:scale-95
//                 disabled:opacity-70
//               "
//             >
//               <ShoppingCart size={14} />

//               {addingCart ? "Adding..." : "Add to Cart"}
//             </button>

//             {/* VIEW */}
//             {/* <Link
//               href={`/products/${id}`}
//               className="
//                 flex items-center justify-center
//                 rounded-md border px-3
//                 text-xs sm:text-sm text-gray-600
//                 hover:bg-gray-50
//               "
//             >
//               View
//             </Link> */}

//           </div>
//         </div>
//       </div>

//       {/* AUTH MODAL */}
//       <AuthModal
//         isOpen={isAuthOpen}
//         onClose={() => setIsAuthOpen(false)}
//       />
//     </>
//   );
// }











"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { AuthModal } from "@/components";

import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";

export default function ProductCard({ product }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [addingCart, setAddingCart] = useState(false);

  const { addCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
    fetchWishlist,
  } = useWishlist();

  // Replace with actual auth later
  const user = true;

  const id = product?.id;

  const imageUrl =
    product?.thumbnail_url ||
    product?.images?.[0]?.image_url ||
    "/images/product-placeholder.png";

  // ✅ Fetch wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  // ❤️ Wishlist Handler
  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    try {
      if (isWishlisted(id)) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🛒 Add Cart
  const handleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    if (addingCart) return;

    try {
      setAddingCart(true);

      await addCart(id, 1);

      console.log("Added to cart");
    } catch (error) {
      console.log(error);
    } finally {
      setAddingCart(false);
    }
  };

  return (
    <>
      <div
        className="
          group flex h-full flex-col overflow-hidden
          rounded-xl border border-gray-200
          bg-white shadow-sm
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg
        "
      >
        {/* IMAGE */}
        <Link href={`/products/${id}`}>
          <div
            className="
              relative aspect-square overflow-hidden
              bg-gray-100
            "
          >
            <Image
              src={imageUrl}
              alt={product?.name || "Product"}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="
                object-contain p-3
                transition-transform duration-300
                group-hover:scale-105
              "
            />

            {/* ❤️ Wishlist */}
            <button
              onClick={handleWishlist}
              aria-label="Wishlist"
              className="
                absolute right-2 top-2 z-10
                flex h-9 w-9 items-center justify-center
                rounded-full bg-white shadow-md
                transition hover:scale-105
                active:scale-95
              "
            >
              <Heart
                size={16}
                fill={
                  isWishlisted(id)
                    ? "currentColor"
                    : "none"
                }
                className={
                  isWishlisted(id)
                    ? "text-red-500"
                    : "text-gray-600"
                }
              />
            </button>
          </div>
        </Link>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          {/* PRODUCT NAME */}
          <Link href={`/products/${id}`}>
            <h3
              className="
                min-h-[44px]
                text-sm font-semibold text-gray-800
                line-clamp-2
                transition-colors
                hover:text-[var(--color-text-primary)]
                sm:text-base
              "
            >
              {product?.name}
            </h3>
          </Link>

          {/* ⭐ Rating */}
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-600 sm:text-sm">
            <Star
              size={13}
              className="fill-yellow-400 text-yellow-400"
            />

            <span>
              {product?.rating || 0} (
              {product?.review_count || 0})
            </span>
          </div>

          {/* 💰 Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">
              ₹{product?.sale_price}
            </span>

            {product?.mrp && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product?.mrp}
              </span>
            )}
          </div>

          {/* 📦 Stock */}
          <p className="mt-1 text-xs text-gray-500">
            {product?.stock_status} •{" "}
            {product?.stock_qty} left
          </p>

          {/* 🛒 Actions */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleCart}
              disabled={addingCart}
              className="
                flex flex-1 items-center justify-center gap-2
                rounded-lg
                bg-[var(--color-text-primary)]
                px-3 py-2.5
                text-sm font-medium text-white
                transition-all duration-200
                hover:opacity-90
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              <ShoppingCart size={16} />

              {addingCart
                ? "Adding..."
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}