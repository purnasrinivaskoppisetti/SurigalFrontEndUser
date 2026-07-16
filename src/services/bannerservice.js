import { API_ENDPOINTS } from "@/lib/endpoints";
import api from "@/lib/axios";


export const getBannersService = async () => {
  const response = await api.get(API_ENDPOINTS.GET_BANNER);
  return response.data;
};