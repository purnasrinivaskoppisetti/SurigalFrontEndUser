"use client";

import WishlistCard from "./WishlistCard";

export default function WishlistGrid({
  wishlist,
  removeFromWishlist,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {wishlist.map((item) => (
        <WishlistCard
          key={item.wishlist_id}
          product={item}
          removeFromWishlist={removeFromWishlist}
        />
      ))}
    </div>
  );
}