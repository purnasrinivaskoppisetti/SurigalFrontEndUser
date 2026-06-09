

"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

import Text from "@/components/ui/Text";
import { AuthModal } from "@/components";

import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";

export default function ProductCard({ product }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [addingCart, setAddingCart] = useState(false);

  const { addCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } =
    useWishlist();

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

    if (isWishlisted(id)) {
      await removeFromWishlist(id);
    } else {
      await addToWishlist(id);
    }
  };

  // 🛒 Cart
  const handleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (addingCart) return;

    try {
      setAddingCart(true);
      await addCart(id, 1);
    } finally {
      setAddingCart(false);
    }
  };

  return (
    <>
      <Link href={`/products/${id}`} className="group block">

        <div className="
          flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm
          transition hover:shadow-md
        ">

          {/* IMAGE */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-100">

            <Image
              src={imageUrl}
              alt={product?.name || "Product"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
            />

            {/* HEART */}
            <button
              onClick={handleWishlist}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
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

          {/* CONTENT */}
          <div className="p-3 sm:p-4">

            {/* NAME */}
            <h3 className="text-sm sm:text-base font-semibold line-clamp-2">
              {product?.name}
            </h3>

            {/* RATING */}
            <div className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-gray-600">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
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

              {/* CART */}
              <button
                onClick={handleCart}
                disabled={addingCart}
                className="
                  flex flex-1 items-center justify-center gap-2
                  rounded-md bg-[var(--color-text-primary)]
                  py-2 text-xs sm:text-sm text-white
                  active:scale-95 transition
                "
              >
                <ShoppingCart size={14} />
                {addingCart ? "Adding..." : "Add"}
              </button>

              {/* VIEW */}
              <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                View
              </span>

            </div>

          </div>
        </div>
      </Link>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}