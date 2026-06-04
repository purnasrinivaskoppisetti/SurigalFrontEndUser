import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const addToCartService = async (
  productId,
  quantity
) => {
  const response = await api.post(
    API_ENDPOINTS.ADD_TO_CART(productId),
    {
      quantity,
    }
  );

  return response.data;
};
export const getCartService =
  async (
    page = 1,
    pageSize = 20
  ) => {
    const response =
      await api.get(
        API_ENDPOINTS.GET_CART,
        {
          params: {
            page,
            page_size: pageSize,
          },
        }
      );

    return response.data;
  };
export const removeCartItemService =
  async (productId) => {
    const response =
      await api.delete(
        API_ENDPOINTS.REMOVE_CART(
          productId
        )
      );

    return response.data;
  };
  