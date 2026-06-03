"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Text from "@/components/ui/Text";

export default function ProductCard({
  product,
}) {
  return (
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
        </div>

        {/* Content */}

        <div className="p-4">
          <Text
            as="h3"
            variant="h6"
            className="
              text-slate-900
              line-clamp-2
            "
          >
            {product.name}
          </Text>

          {product.category_name && (
            <Text
              variant="bodySmall"
              className="mt-1"
            >
              {product.category_name}
            </Text>
          )}

          <div className="my-4 h-px bg-slate-100" />

          <div className="flex items-center justify-between">
            <Text
              variant="label"
              className="
                text-[var(--color-text-primary)]
              "
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
  );
}