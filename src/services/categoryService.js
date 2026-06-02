import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const categoryService = {
  getCategories: async () => {
    const response = await api.get(
      API_ENDPOINTS.CATEGORIES
    );

    return response.data;
  },
};