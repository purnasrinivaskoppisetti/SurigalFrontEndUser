"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Text from "@/components/ui/Text";

import {
  addWishlist,
  removeWishlist,
} from "@/redux/wishlistSlice";

import { addWishlistService } from "@/services/wishlist.service";
import { useState } from "react";
import { AuthModal } from "@/components";
export default function ProductCard({
  product,
}) {
  const dispatch =
    useDispatch();
  const [isAuthOpen, setIsAuthOpen] =
    useState(false);

  const user = useSelector(
    (state) => state.user.user
  );
  const wishlist =
    useSelector(
      (state) =>
        state.wishlist.items
    );

  const isWishlisted =
    wishlist.includes(
      product.id
    );

  const handleWishlist =
    async (e) => {
      e.preventDefault();

      if (!user) {
        setIsAuthOpen(true);
        return;
      }

      try {
        await addWishlistService(
          product.id
        );

        if (
          isWishlisted
        ) {
          dispatch(
            removeWishlist(
              product.id
            )
          );
        } else {
          dispatch(
            addWishlist(
              product.id
            )
          );
        }
      } catch (error) {
        console.log(
          "Wishlist Error",
          error
        );
      }
    };

  return (
    <>
      <Link
        href={`/products/${product.id}`}
        className="group block"
      >
        <div
          className="
          flex h-full flex-col
          overflow-hidden
          rounded-md
          border border-slate-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
        "
        >
          {/* Image */}

          <div className="relative aspect-[16/10] bg-slate-100">
            <Image
              src={
                product?.thumbnail_url ||
                "/images/product-placeholder.png"
              }
              alt={
                product?.name ||
                "Product"
              }
              fill
              className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            />

            {/* Wishlist */}

            <button
              type="button"
              onClick={
                handleWishlist
              }
              className="
              absolute
              right-3
              top-3
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md
              transition
              hover:scale-110
            "
            >
              <Heart
                size={16}
                className={
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-slate-600"
                }
              />
            </button>
          </div>

          {/* Content */}

          <div className="flex flex-1 flex-col p-4">
            <Text
              as="h3"
              variant="h6"
              className="
              line-clamp-2
              text-slate-900
            "
            >
              {product.name}
            </Text>

            {product.category_name && (
              <Text
                variant="bodySmall"
                className="mt-1"
              >
                {
                  product.category_name
                }
              </Text>
            )}

            <div className="my-4 h-px bg-slate-100" />

            <div className="mt-auto flex items-center justify-between">
              <Text
                variant="label"
                className="text-text-primary"
              >
                View Details
              </Text>

              <ArrowRight
                size={18}
                className="
                text-[var(--color-text-primary)]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
              />
            </div>
          </div>
        </div>

      </Link>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() =>
          setIsAuthOpen(false)
        }
      />
    </>
  );
}