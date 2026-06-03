"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import Image from "next/image";

import {
  Container,
  Text,
  Button,
} from "@/components";

import useCart from "@/hooks/useCart";
import useProductDetails from "@/hooks/useProductDetails";

export default function Page() {
  const { id } = useParams();

  const router =
    useRouter();

  const {
    product,
    loading,
    fetchProduct,
  } = useProductDetails();

  const { addCart } =
    useCart();

  const [adding, setAdding] =
    useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const handleBuyNow =
    async () => {
      try {
        setAdding(true);

        const response =
          await addCart(
            product.id,
            1
          );

        if (
          response?.success
        ) {
          router.push(
            "/cart"
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setAdding(false);
      }
    };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        Product not found
      </div>
    );
  }

  return (
    <section className="py-6 md:py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}

          <div className="overflow-hidden rounded-2xl border bg-white">
            <div className="relative h-[320px] md:h-[500px]">
              <Image
                src={
                  product.thumbnail_url ||
                  "/images/product-placeholder.png"
                }
                alt={
                  product.name
                }
                fill
                className="object-contain p-4"
              />
            </div>
          </div>

          {/* Details */}

          <div>
            <p className="mb-2 text-sm font-medium text-text-primary">
              {
                product?.category
                  ?.name
              }
            </p>

            <Text
              variant="h2"
              className="mb-3 text-black"
            >
              {product.name}
            </Text>

            <p className="mb-2 text-gray-500">
              Brand:
              {product.brand}
            </p>

            <p className="mb-4 text-gray-500">
              SKU:
              {product.sku}
            </p>

            <div className="mb-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-text-primary">
                ₹
                {Number(
                  product.sale_price
                ).toLocaleString()}
              </span>

              <span className="text-lg text-gray-400 line-through">
                ₹
                {Number(
                  product.mrp
                ).toLocaleString()}
              </span>
            </div>

            <div className="mb-6">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                {
                  product.stock_status
                }
              </span>
            </div>

            <p className="mb-8 leading-7 text-gray-600">
              {
                product.description
              }
            </p>

            {/* Buy Now Button */}

            <Button
              variant="primary"
              size="lg"
              onClick={
                handleBuyNow
              }
              disabled={
                adding
              }
              className="w-full"
            >
              {adding
                ? "Processing..."
                : "Buy Now"}
            </Button>

            {/* Product Information */}

            <div className="mt-10 rounded-2xl border bg-white p-5">
              <Text
                variant="h5"
                className="mb-4 text-black"
              >
                Product Information
              </Text>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <strong>
                    Manufacturer:
                  </strong>
                  <p>
                    {
                      product.manufacturer
                    }
                  </p>
                </div>

                <div>
                  <strong>
                    HSN Code:
                  </strong>
                  <p>
                    {
                      product.hsn_code
                    }
                  </p>
                </div>

                <div>
                  <strong>
                    Stock Qty:
                  </strong>
                  <p>
                    {
                      product.stock_qty
                    }
                  </p>
                </div>

                <div>
                  <strong>
                    Rating:
                  </strong>
                  <p>
                    {
                      product.rating
                    }
                    (
                    {
                      product.review_count
                    }
                    Reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}