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
  const [addedToCart, setAddedToCart] =
    useState(false);

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

    // Prevent multiple clicks
    if (addingCart || addedToCart) return;

    try {
      setAddingCart(true);

      await addCart(id, 1);

      setAddedToCart(true);

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
            {product?.stock_qty === 0
              ? "Out of Stock"
              : `${product?.stock_status} • ${product?.stock_qty} left`}
          </p>

          {/* 🛒 Actions */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleCart}
              disabled={
                addingCart ||
                addedToCart ||
                product?.stock_qty === 0
              }
              className={`
                flex flex-1 items-center justify-center gap-2
                rounded-lg
                px-3 py-2.5
                text-sm font-medium text-white
                transition-all duration-200
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-70
                ${
                  product?.stock_qty === 0
                    ? "bg-gray-400"
                    : addedToCart
                    ? "bg-[var(--color-text-primary)]"
                    : "bg-[var(--color-text-primary)] hover:opacity-90"
                }
              `}
            >
              <ShoppingCart size={16} />

              {product?.stock_qty === 0
                ? "Out of Stock"
                : addingCart
                ? "Adding..."
                : addedToCart
                ? "Added to Cart"
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