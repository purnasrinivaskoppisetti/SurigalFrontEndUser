export const API_ENDPOINTS = {
  REGISTER: "/api/v1/auth/register",
  LOGIN: "/api/v1/auth/login",
  CATEGORIES: "/api/v1/store/categories",
  PRODUCTS: "/api/v1/store/products",
  PRODUCT_DETAILS: (id) => `/api/v1/store/products/${id}`,
  ADD_TO_CART: (id) => `/api/v1/customer/cart/add/${id}`,
  GET_CART: "/api/v1/customer/cart",
  REMOVE_CART: (id) => `/api/v1/customer/cart/remove/${id}`,
  GET_ADDRESSES: "/api/v1/customer/addresses",
  CREATE_ADDRESS: "/api/v1/customer/addresses",
  GET_ADDRESS: `/api/v1/customer/addresses/{address_id}`,
  UPDATE_ADDRESS: `/api/v1/customer/addresses/{address_id}`,
  DELETE_ADDRESS: `/api/v1/customer/addresses/{address_id}`,
  GET_ORDERS:`/api/v1/customer/orders`,
  GET_ORDERBYID:`/api/v1/customer/orders/{order_id}`,
  CREATE_REVIEW:`/api/v1/customer/reviews`,
  PAYMENT:`/api/v1/customer/orders/payment-success`,
  CREATE_ORDER:`api/v1/customer/orders`,
  CART_SUMMERY:`api/v1/customer/cart/summary`,
  Apply_COUPON:`api/v1/customer/cart/apply-coupon`
  

};