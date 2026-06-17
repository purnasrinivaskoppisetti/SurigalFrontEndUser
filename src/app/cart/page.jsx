"use client";

import { useEffect } from "react";
import Link from "next/link";

import useCartList from "@/hooks/useCartList";

import {
  CartItem,
  CartSummary,
  CartSkeleton,
  Container,
  Text,
  Button,
} from "@/components";

export default function CartPage() {
  const {
    cart,
    summary,
    loading,
    fetchCart,
  } = useCartList();

  useEffect(() => {
    fetchCart(true);
  }, []);

  if (loading) {
    return (
      <Container className="py-10">
        <CartSkeleton />
      </Container>
    );
  }

  if (!cart?.length) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <div className="mb-4 text-5xl">🛒</div>

          <Text
            variant="h3"
            className="text-black"
          >
            Your cart is empty
          </Text>

          <Text className="mt-2">
            Browse our bestsellers and add your favourites.
          </Text>

          <Link
            href="/products"
            className="mt-6 inline-block"
          >
            <Button size="lg">
              Start Shopping →
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="mb-8">
        <Text
          variant="h2"
          className="text-black"
        >
          Shopping Cart
        </Text>

        <Text>
          {summary?.total_items || 0} Item(s) in your cart
        </Text>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left Side */}
        <div>
          <div className="space-y-5">
            {cart.map((item) => (
              <CartItem
                key={item.cart_id}
                item={item}
                fetchCart={fetchCart}
              />
            ))}
          </div>

          {/* Continue Shopping Button */}
          <div className="mt-6">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <CartSummary summary={summary} />
      </div>
    </Container>
  );
}