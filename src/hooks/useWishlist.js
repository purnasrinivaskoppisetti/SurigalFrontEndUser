"use client";

import { useState } from "react";

import { getWishlistService } from "@/services/wishlist.service";

export default function useWishlist() {
  const [wishlist, setWishlist] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [pagination, setPagination] =
    useState(null);

  const fetchWishlist =
    async () => {
      try {
        setLoading(true);

        const response =
          await getWishlistService();

        if (response.success) {
          setWishlist(
            response.data
          );

          setPagination(
            response.pagination
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return {
    wishlist,
    loading,
    pagination,
    fetchWishlist,
  };
}