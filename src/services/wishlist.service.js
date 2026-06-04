import api from "@/lib/axios";

export const addWishlistService =
  async (productId) => {
    const response =
      await api.post(
        `/api/v1/customer/wishlist/${productId}`
      );

    return response.data;
  };