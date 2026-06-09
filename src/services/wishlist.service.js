import api from "@/lib/axios";

export const addWishlistService =
  async (productId) => {
    const response =
      await api.post(
        `/api/v1/customer/wishlist/${productId}`
      );

    return response.data;
  };
export const getWishlistService =
  async (
    page = 1,
    page_size = 20
  ) => {
    const response =
      await api.get(
        "/api/v1/customer/wishlist",
        {
          params: {
            page,
            page_size,
          },
        }
      );

    return response.data;
  };


  export const removeWishlistService = async (productId) => {
  const response = await api.delete(
    `/api/v1/customer/wishlist/${productId}`
  );

  return response.data;
};