import { API_ENDPOINTS } from "@/lib/endpoints";
import api from "@/lib/axios";

export const paymentSuccessService = async (paymentData) => {
  const response = await api.post(
    API_ENDPOINTS.PAYMENT,
    paymentData
  );

  return response.data;
};