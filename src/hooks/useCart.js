


"use client";
 
import { useDispatch } from "react-redux";
 
import {
  setCartQty,
} from "@/redux/cartSlice";
 
import {
  addToCartService,
  removeCartItemService,
} from "@/services/cart.service";
 
export default function useCart() {
  const dispatch =
    useDispatch();
 
  const addCart = async (
    productId,
    quantity
  ) => {
    try {
      const response =
        await addToCartService(
          productId,
          quantity
        );
 
      if (response.success) {
        dispatch(
          setCartQty({
            productId,
            quantity,
          })
        );
 
        window.dispatchEvent(
          new Event("cartUpdated")
        );
      }
 
      return response;
    } catch (error) {
      console.log(error);
 
      return {
        success: false,
      };
    }
  };
 
  const removeItem = async (
    productId
  ) => {
    try {
      const response =
        await removeCartItemService(
          productId
        );
 
      if (response.success) {
        dispatch(
          setCartQty({
            productId,
            quantity: 0,
          })
        );
 
        window.dispatchEvent(
          new Event("cartUpdated")
        );
      }
 
      return response;
    } catch (error) {
      console.log(error);
 
      return {
        success: false,
      };
    }
  };
 
  return {
    addCart,
    removeItem,
  };
}