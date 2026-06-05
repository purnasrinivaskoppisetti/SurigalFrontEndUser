"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingCart,
} from "lucide-react";

import Text from "@/components/ui/Text";

export default function WishlistCard({
  product,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">
      <Link
        href={`/products/${product.product_id}`}
      >
        <div className="relative aspect-square">
          <Image
            src={
              product.thumbnail_url
            }
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <Text
          variant="bodySmall"
          className="text-[var(--color-text-primary)]"
        >
          {product.category_name}
        </Text>

        <Text
          variant="h6"
          className="mt-1 line-clamp-2"
        >
          {product.name}
        </Text>

        <div className="mt-3 flex items-center gap-2">
          <Text className="font-semibold text-green-600">
            ₹
            {product.sale_price}
          </Text>

          <Text className="text-sm text-gray-400 line-through">
            ₹{product.mrp}
          </Text>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 rounded-lg bg-[var(--color-text-primary)] py-2 text-white"
          >
            <ShoppingCart
              size={16}
              className="mx-auto"
            />
          </button>

          <button
            className="rounded-lg border px-3"
          >
            <Heart
              size={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
}