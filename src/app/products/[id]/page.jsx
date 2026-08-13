"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";

import { Container, Text, Button, AuthModal } from "@/components";
import useCart from "@/hooks/useCart";
import useProductDetails from "@/hooks/useProductDetails";
import { useSelector } from "react-redux";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Track selected variant
  const [selectedVariant, setSelectedVariant] = useState(null);

  const user = useSelector((state) => state.user?.user);

  const { product, loading, fetchProduct } = useProductDetails();
  const { addCart } = useCart();

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  // Set default variant when product data loads
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product?.id]);

  const images =
    product?.images?.length > 0
      ? product.images
      : [{ image_url: product?.thumbnail_url }];

  // ================= AUTO SLIDER =================
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  // ================= ACTIVE DATA (VARIANT OR PRODUCT) =================
  const currentSalePrice = selectedVariant ? selectedVariant.sale_price : product?.sale_price;
  const currentMrp = selectedVariant ? selectedVariant.mrp : product?.mrp;
  const currentStockStatus = selectedVariant ? selectedVariant.stock_status : product?.stock_status;
  const currentStockQty = selectedVariant ? selectedVariant.available_stock : product?.stock_qty;

  // ================= STOCK LOGIC =================
  const isOutOfStock =
    currentStockStatus?.toLowerCase() === "out of stock" ||
    Number(currentStockQty) <= 0;

  // Inside src/app/products/[id]/page.jsx

const handleBuyNow = async () => {
  if (isOutOfStock) return;

  try {
    setAdding(true);

    const productId = product?.id || product?.product_id;

    // Grab variant ID safely: selectedVariant -> first variant in array -> variant_id on product
    const activeVariant =
      selectedVariant ||
      (product?.variants?.length > 0 ? product.variants[0] : null);

    const variantId = activeVariant?.id || product?.variant_id || null;

    const res = await addCart(productId, 1, product, variantId);

    if (res?.success) {
      router.push("/cart");
    }
  } catch (error) {
    console.error("Failed to add to cart:", error);
  } finally {
    setAdding(false);
  }
};

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="py-20 text-center">Product not found</div>;
  }

  const reviewBlock = product?.reviews?.[0];
  const ratingSummary = reviewBlock?.rating_summary;

  return (
    <section className="py-6 md:py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ================= IMAGE SLIDER ================= */}
          <div className="overflow-hidden rounded-2xl border bg-white">
            <div className="relative h-[320px] md:h-[500px] flex items-center justify-center">
              <Image
                src={images[currentImageIndex]?.image_url}
                alt={product.name}
                fill
                className="object-contain p-4 transition-all duration-500"
              />
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div>
            <p className="text-sm text-green-600 font-medium">
              {product?.category?.name}
            </p>

            <Text variant="h2">{product.name}</Text>

            <p className="text-gray-500 mt-1">Brand: {product.brand}</p>

            {/* PRICE */}
            <div className="flex gap-3 items-center my-4">
              <span className="text-3xl font-bold text-green-600">
                ₹{currentSalePrice}
              </span>

              <span className="line-through text-gray-400">
                ₹{currentMrp}
              </span>
            </div>

            {/* ================= VARIANTS SELECTION ================= */}
            {product?.variants?.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Select Size:</p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          isSelected
                            ? "border-green-600 bg-green-50 text-green-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {variant.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ================= STOCK BADGE ================= */}
            <div className="mb-3">
              {isOutOfStock ? (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              ) : (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {currentStockStatus}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 text-gray-600">
              {product.short_description}
            </p>

            <p className="mt-2 text-gray-600">{product.description}</p>

            {/* ================= BUY BUTTON ================= */}
            <Button
              className="w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBuyNow}
              disabled={adding || isOutOfStock}
            >
              {isOutOfStock
                ? "Out of Stock"
                : adding
                ? "Processing..."
                : "Buy Now"}
            </Button>

            {/* ================= PRODUCT INFO ================= */}
            <div className="mt-8 border rounded-2xl p-5 bg-white">
              <h2 className="text-xl font-bold mb-4">Product Information</h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">SKU</p>
                  <p className="font-semibold">{selectedVariant ? selectedVariant.sku : product.sku}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">Manufacturer</p>
                  <p className="font-semibold">{product.manufacturer}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">HSN Code</p>
                  <p className="font-semibold">{product.hsn_code}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">Stock Qty</p>
                  <p className="font-semibold">{currentStockQty}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">Weight</p>
                  <p className="font-semibold">{product.weight} kg</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">Length</p>
                  <p className="font-semibold">{product.length} cm</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">Breadth</p>
                  <p className="font-semibold">{product.breadth} cm</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">Height</p>
                  <p className="font-semibold">{product.height} cm</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl col-span-2">
                  <p className="text-gray-500">Status</p>
                  <p className="font-semibold">{product.status}</p>
                </div>
              </div>
            </div>

            {/* ================= REVIEWS ================= */}
            <div className="mt-8 border rounded-2xl p-5 bg-white">
              <h2 className="text-xl font-bold mb-4">Ratings & Reviews</h2>

              {/* AVG RATING */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-green-600">
                  {ratingSummary?.average_rating || product.rating}
                </div>

                <div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i <
                          Math.round(
                            ratingSummary?.average_rating || product.rating
                          )
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-500">
                    {ratingSummary?.total_reviews || product.review_count}{" "}
                    Reviews
                  </p>
                </div>
              </div>

              {/* REVIEWS LIST */}
              <div className="space-y-4 max-h-[280px] overflow-y-auto">
                {reviewBlock?.reviews?.length ? (
                  reviewBlock.reviews.map((r) => (
                    <div key={r.id} className="border rounded-xl p-3">
                      <div className="flex justify-between">
                        <p className="font-semibold">{r.user?.name}</p>
                        <span className="text-yellow-500">{r.rating}★</span>
                      </div>

                      <p className="text-gray-600 text-sm mt-1">
                        {r.review_text}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No reviews yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      </Container>
    </section>
  );
}