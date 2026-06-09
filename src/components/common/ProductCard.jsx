"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import { useState } from "react";

import Text from "@/components/ui/Text";
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
  } = useWishlist();

  const user = true;

  const id = product?.id;

  const imageUrl =
    product?.thumbnail_url ||
    product?.images?.[0]?.image_url ||
    "/images/product-placeholder.png";

  // ❤️ Wishlist
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
          group flex flex-col overflow-hidden
          rounded-lg border bg-white shadow-sm
          transition hover:shadow-md
        "
      >
        {/* IMAGE */}
        <Link href={`/products/${id}`}>
          <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-100 overflow-hidden">

            <Image
              src={imageUrl}
              alt={product?.name || "Product"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-1 transition-transform group-hover:scale-105"

            />

            {/* ❤️ Wishlist */}
            <button
              onClick={handleWishlist}
              className="
                absolute right-2 top-2
                flex h-8 w-8 items-center justify-center
                rounded-full bg-white shadow
              "
            >
              <Heart
                size={14}
                className={
                  isWishlisted(id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }
              />
            </button>
          </div>
        </Link>

        {/* CONTENT */}
        <div className="p-3 sm:p-4">

          {/* NAME */}
          <Link href={`/products/${id}`}>
            <h3 className="text-sm sm:text-base font-semibold line-clamp-2 hover:text-[var(--color-text-primary)] transition">
              {product?.name}
            </h3>
          </Link>

          {/* RATING */}
          <div className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-gray-600">
            <Star
              size={12}
              className="fill-yellow-500 text-yellow-500"
            />

            <span>
              {product?.rating} ({product?.review_count})
            </span>
          </div>

          {/* PRICE */}
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-base sm:text-lg font-bold text-green-600">
              ₹{product?.sale_price}
            </span>

            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₹{product?.mrp}
            </span>
          </div>

          {/* STOCK */}
          <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
            {product?.stock_status} • {product?.stock_qty} left
          </p>

          {/* ACTIONS */}
          <div className="mt-3 flex gap-2">

            {/* ADD CART */}
            <button
              onClick={handleCart}
              disabled={addingCart}
              className="
                flex flex-1 items-center justify-center gap-2
                rounded-md bg-[var(--color-text-primary)]
                py-2 text-xs sm:text-sm text-white
                transition active:scale-95
                disabled:opacity-70
              "
            >
              <ShoppingCart size={14} />

              {addingCart ? "Adding..." : "Add to Cart"}
            </button>

            {/* VIEW */}
            {/* <Link
              href={`/products/${id}`}
              className="
                flex items-center justify-center
                rounded-md border px-3
                text-xs sm:text-sm text-gray-600
                hover:bg-gray-50
              "
            >
              View
            </Link> */}

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