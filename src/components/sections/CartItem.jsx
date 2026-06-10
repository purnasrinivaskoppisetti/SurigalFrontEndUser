
"use client";
 
import { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
 
import Text from "@/components/ui/Text";
import useCart from "@/hooks/useCart";
 
export default function CartItem({
  item,
  fetchCart,
}) {
  const {
    addCart,
    removeItem,
  } = useCart();
 
  const [qty, setQty] = useState(item.quantity);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);
 
  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = async (newQty) => {
  if (loading) return;
 
  if (newQty < 1) return;
 
  try {
    setLoading(true);
 
    const response = await addCart(
      item.product_id,
      newQty
    );
 
    if (response?.success) {
      setQty(newQty);
 
      await fetchCart(false);
    }
  } catch (error) {
    console.log(
      "Quantity Update Error:",
      error
    );
  } finally {
    setLoading(false);
  }
};
 
  // =========================
  // REMOVE ITEM
  // =========================
  const handleRemove =
    async () => {
      try {
        setLoading(true);
 
        const response =
          await removeItem(
            item.product_id
          );
 
        if (
          response?.success
        ) {
          await fetchCart(false);
        }
      } catch (error) {
        console.log(
          "Remove Item Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
 
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row">
 
        {/* Product Image */}
        <div className="overflow-hidden rounded-xl border bg-gray-50">
          <Image
            src={item.thumbnail_url}
            alt={item.name}
            width={120}
            height={120}
            className="h-[120px] w-[120px] object-contain"
          />
        </div>
 
        {/* Product Details */}
        <div className="flex-1">
          <Text
            variant="h5"
            className="text-black"
          >
            {item.name}
          </Text>
 
          <Text className="mt-1">
            SKU: {item.sku}
          </Text>
 
          <Text className="mt-1">
            Brand: {item.brand}
          </Text>
 
          <Text className="mt-1">
            Category:
            {item.category_name}
          </Text>
 
          {/* PRICE */}
          <div className="mt-3 flex items-center gap-3">
            <Text
              variant="h5"
              className="text-text-primary"
            >
              ₹
              {item.sale_price.toLocaleString()}
            </Text>
 
            <span className="text-sm text-gray-400 line-through">
              ₹
              {item.mrp.toLocaleString()}
            </span>
          </div>
 
          {/* TOTAL */}
          <Text className="mt-2 font-semibold text-green-600">
            Total: ₹
            {(
              qty *
              item.sale_price
            ).toLocaleString()}
          </Text>
 
          {/* ACTIONS */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
 
            {/* QUANTITY */}
            <div className="flex items-center rounded-xl border">
 
              {/* MINUS */}
              <button
                type="button"
                disabled={
                  loading ||
                  qty <= 1
                }
                onClick={() =>
                  updateQuantity(
                    qty - 1
                  )
                }
                className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              >
                <Minus size={18} />
              </button>
 
              <span className="min-w-[50px] text-center font-semibold">
                {qty}
              </span>
 
              {/* PLUS */}
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  updateQuantity(
                    qty + 1
                  )
                }
                className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              >
                <Plus size={18} />
              </button>
            </div>
 
            {/* REMOVE */}
            <button
              type="button"
              disabled={loading}
              onClick={
                handleRemove
              }
              className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 size={18} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 