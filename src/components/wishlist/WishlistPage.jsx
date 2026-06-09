"use client";

import { useEffect } from "react";

import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

import useWishlist from "@/hooks/useWishlist";

import WishlistGrid from "./WishlistGrid";
import EmptyWishlist from "./EmptyWishlist";

export default function WishlistPage() {
  const {
    wishlist,
    loading,
    pagination,
    fetchWishlist,
    removeFromWishlist,
  } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <section className="py-8">
      <Container>
        <div className="mb-8 flex justify-between">
          <Text variant="h3">My Wishlist</Text>

          <Text>{wishlist.length} Items</Text>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : wishlist.length > 0 ? (
          <WishlistGrid
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />
        ) : (
          <EmptyWishlist
            title="Your wishlist is empty"
            description="Save products you love."
            buttonText="Explore Products"
            buttonLink="/products"
          />
        )}
      </Container>
    </section>
  );
}