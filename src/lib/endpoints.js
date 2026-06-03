export const API_ENDPOINTS = {
  REGISTER: "/api/v1/auth/register",
  LOGIN: "/api/v1/auth/login",
  CATEGORIES: "/api/v1/store/categories",
  PRODUCTS:"/api/v1/store/products",
  PRODUCT_DETAILS: (id) =>`/api/v1/store/products/${id}`,
  ADD_TO_CART:(id)=>`/api/v1/customer/cart/${id}`,
  GET_CART:"/api/v1/customer/cart",
  REMOVE_CART:(id)=>`/api/v1/customer/cart/${id}`,
};