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


 

export const getCartSummaryService = async () => {
  const response = await api.get(
    API_ENDPOINTS.CART_SUMMERY
  );
  return response.data;
};

export const applyCouponService = async (coupon_code) => {
  const response = await api.post(API_ENDPOINTS.APPLY_COUPON, {
    coupon_code,
  });

  return response.data;
};