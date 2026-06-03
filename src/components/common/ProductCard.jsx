"use client";

import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components";

export default function ProductCard({
  product,
}) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block"
    >
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-40 md:h-56">
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
            className="object-cover"
          />
        </div>

        <div className="p-3 md:p-4">
          <Text
            variant="caption"
            className="text-gray-500"
          >
            {product.brand}
          </Text>

          <Text
            as="h3"
            variant="h6"
            className="mt-1 line-clamp-2 text-black"
          >
            {product.name}
          </Text>

          <Text
            variant="bodySmall"
            className="mt-1"
          >
            {product.category_name}
          </Text>

          <div className="mt-3 flex items-center gap-2">
            <Text
              as="span"
              variant="h6"
              className="text-[var(--color-text-primary)]"
            >
              ₹
              {Number(
                product.sale_price
              ).toLocaleString()}
            </Text>

            <Text
              as="span"
              variant="bodySmall"
              className="text-gray-400 line-through"
            >
              ₹
              {Number(
                product.mrp
              ).toLocaleString()}
            </Text>
          </div>

          <button className="mt-4 w-full rounded-lg border border-[var(--color-text-primary)] py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-text-primary)] hover:text-white">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}