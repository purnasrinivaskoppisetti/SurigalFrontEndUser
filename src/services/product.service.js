import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const getProducts = async ({
  page = 1,
  page_size = 20,
  search = "",
  category_id = "",
}) => {
  const response = await api.get(
    API_ENDPOINTS.PRODUCTS,
    {
      params: {
        page,
        page_size,
        search:
          search || undefined,
        category_id:
          category_id || undefined,
      },
    }
  );

  return response.data;
};