"use client";

import { useState } from "react";

import ReviewModal from "./reviewmodel";
import OrderCard from "./ordercard";

import useOrders from "@/hooks/useorderreview";

export default function OrdersList() {
  // =========================
  // STATES
  // =========================
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  // =========================
  // HOOK
  // =========================
  const {
    orders,
    loading,
    error,
    fetchOrderById,
  } = useOrders();

  // =========================
  // OPEN REVIEW MODAL
  // =========================
  const handleOpenReview =
    async (order) => {
      try {
        setDetailsLoading(true);

        // FETCH SINGLE ORDER DETAILS
        const orderDetails =
          await fetchOrderById(
            order.order_id
          );

        console.log(
          "ORDER DETAILS =>",
          orderDetails
        );

        // PRODUCTS ARRAY
        const product =
          orderDetails?.products?.[0];

        // IMPORTANT
        // BACKEND MUST RETURN PRODUCT_ID
        if (!product?.product_id) {
          alert(
            "Product ID not found"
          );

          return;
        }

        // SET DATA FOR REVIEW MODAL
        setSelectedOrder({
          // ORDER DATA
          ...order,

          // PRODUCT DATA
          product_id:
            product?.product_id,

          product_name:
            product?.product_name ||
            "Medical Product",

          image:
            product?.image_url ||
            "/placeholder.png",

          image_url:
            product?.image_url ||
            "/placeholder.png",

          // UI DATA
          total_amount:
            order?.total_amount,

          order_number:
            order?.order_number,

          payment_status:
            order?.payment_status,

          status:
            order?.status,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setDetailsLoading(false);
      }
    };

  return (
    <div className="space-y-6">
      {/* ========================= */}
      {/* TITLE */}
      {/* ========================= */}
      <div>
        <h2 className="text-2xl font-bold text-black">
          My Orders
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          View your recent orders and
          share your product
          experience.
        </p>
      </div>

      {/* ========================= */}
      {/* LOADING */}
      {/* ========================= */}
      {(loading ||
        detailsLoading) && (
        <div className="rounded-2xl border bg-white p-8 text-center text-sm text-gray-500">
          Loading orders...
        </div>
      )}

      {/* ========================= */}
      {/* ERROR */}
      {/* ========================= */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ========================= */}
      {/* EMPTY */}
      {/* ========================= */}
      {!loading &&
        orders?.length === 0 && (
          <div className="rounded-2xl border bg-white p-8 text-center text-sm text-gray-500">
            No orders found
          </div>
        )}

      {/* ========================= */}
      {/* ORDERS */}
      {/* ========================= */}
      {!loading &&
        orders?.map((order) => (
          <OrderCard
            key={order.order_id}
            order={{
              ...order,

              // FALLBACK VALUES
              product_name:
                order?.product_name ||
                "Medical Product",

              image_url:
                order?.image_url ||
                "/placeholder.png",

              image:
                order?.image_url ||
                "/placeholder.png",

              status:
                order?.status,

              payment_status:
                order?.payment_status,

              total_amount:
                order?.total_amount,
            }}
            onReview={() =>
              handleOpenReview(order)
            }
          />
        ))}

      {/* ========================= */}
      {/* REVIEW MODAL */}
      {/* ========================= */}
      <ReviewModal
        order={selectedOrder}
        onClose={() =>
          setSelectedOrder(null)
        }
      />
    </div>
  );
}