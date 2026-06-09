

"use client";

import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";

import { useRouter } from "next/navigation";

import ReviewModal from "./reviewmodel";

import useOrders from "@/hooks/useorderreview";

export default function OrdersList() {
  // =========================
  // ROUTER
  // =========================
  const router = useRouter();

  // =========================
  // STATES
  // =========================
  const [expandedOrder, setExpandedOrder] =
    useState(null);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // =========================
  // HOOK
  // =========================
  const {
    orders,
    loading,
    error,
  } = useOrders();

  // =========================
  // TOGGLE ORDER
  // =========================
  const toggleOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // =========================
  // PRODUCT NAVIGATION
  // =========================
  const handleProductClick = (
    productId
  ) => {
    if (!productId) return;

    router.push(
      `/products/${productId}`
    );
  };

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <h2 className="text-2xl font-bold text-black">
          My Orders
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          View your orders and review
          products.
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="rounded-2xl border bg-white p-8 text-center text-sm text-gray-500">
          Loading orders...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        orders?.length === 0 && (
          <div className="rounded-2xl border bg-white p-8 text-center text-sm text-gray-500">
            No orders found
          </div>
        )}

      {/* ORDERS */}
      {!loading &&
        orders?.map((order) => (
          <div
            key={order?.order_id}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
          >
            {/* ORDER HEADER */}
            <button
              onClick={() =>
                toggleOrder(
                  order?.order_id
                )
              }
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <div>
                <h3 className="text-lg font-bold text-black">
                  Order #
                  {
                    order?.order_number
                  }
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Status:
                  <span className="ml-1 capitalize text-green-600">
                    {
                      order?.status
                    }
                  </span>
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Payment:
                  <span className="ml-1 capitalize text-black">
                    {
                      order?.payment_status
                    }
                  </span>
                </p>

                <p className="mt-2 text-xl font-bold text-black">
                  ₹
                  {Number(
                    order?.total_amount ||
                      0
                  ).toLocaleString()}
                </p>
              </div>

              {expandedOrder ===
              order?.order_id ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </button>

            {/* PRODUCTS */}
            {expandedOrder ===
              order?.order_id && (
              <div className="border-t border-gray-100 p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  {order?.products?.map(
                    (product) => (
                      <div
                        key={
                          product?.product_id
                        }
                        className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4"
                      >
                        {/* IMAGE */}
                        <img
                          src={
                            product?.product_image ||
                            "/placeholder.png"
                          }
                          alt={
                            product?.product_name
                          }
                          onClick={() =>
                            handleProductClick(
                              product?.product_id
                            )
                          }
                          className="
                            h-24
                            w-24
                            cursor-pointer
                            rounded-2xl
                            border
                            object-cover
                            transition
                            hover:opacity-90
                          "
                        />

                        {/* DETAILS */}
                        <div className="flex-1">
                          {/* PRODUCT NAME */}
                          <h4
                            onClick={() =>
                              handleProductClick(
                                product?.product_id
                              )
                            }
                            className="
                              cursor-pointer
                              font-semibold
                              text-black
                              transition
                              hover:text-gray-600
                            "
                          >
                            {
                              product?.product_name
                            }
                          </h4>

                          <p className="mt-1 text-xs text-gray-500">
                            Product ID:
                          </p>

                          <p className="text-xs text-black">
                            {
                              product?.product_id
                            }
                          </p>

                          {/* REVIEW BUTTON */}
{order?.status?.toLowerCase() ===
  "delivered" && (
  <button
    onClick={() =>
      setSelectedProduct(
        {
          ...product,

          order_number:
            order?.order_number,

          total_amount:
            order?.total_amount,

          payment_status:
            order?.payment_status,

          status:
            order?.status,

          image:
            product?.product_image,
        }
      )
    }
    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
  >
    <Star size={16} />

    Write Review
  </button>
)}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

      {/* REVIEW MODAL */}
      {selectedProduct && (
        <ReviewModal
          order={selectedProduct}
          onClose={() =>
            setSelectedProduct(null)
          }
        />
      )}
    </div>
  );
}