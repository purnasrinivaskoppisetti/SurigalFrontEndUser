import { API_ENDPOINTS } from "@/lib/endpoints";
import api from "@/lib/axios";

export const paymentSuccessService = async (paymentData) => {
  const response = await api.post(
    API_ENDPOINTS.PAYMENT,
    paymentData
  );

  return response.data;
};


export const createOrderService =
  async (orderData) => {
    const response =
      await api.post(
        API_ENDPOINTS.CREATE_ORDER,
        orderData
      );

    return response.data;
  };