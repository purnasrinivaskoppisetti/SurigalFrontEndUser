"use client";
 
import { useDispatch, useSelector } from "react-redux";
import { setCartQty } from "@/redux/cartSlice";
import {
  addToCartService,
  removeCartItemService,
} from "@/services/cart.service";
 
export default function useCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
 
  const addCart = async (productId, quantity, productData = null) => {
    // ... keep your existing addCart code exactly as it is ...
    try {
      if (user?.id) {
        const response = await addToCartService(productId, quantity);
        if (response.success) {
          dispatch(setCartQty({ productId, quantity }));
          window.dispatchEvent(new Event("cartUpdated"));
        }
        return response;
      } else {
        let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const existingItemIndex = guestCart.findIndex(
          (item) => item.product_id === productId
        );
 
        if (existingItemIndex > -1) {
          guestCart[existingItemIndex].quantity = quantity;
          if (productData) guestCart[existingItemIndex].product = productData;
        } else {
          guestCart.push({
            cart_id: `guest_${Date.now()}_${productId}`,
            product_id: productId,
            quantity,
            product: productData || {},
          });
        }
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        dispatch(setCartQty({ productId, quantity }));
        window.dispatchEvent(new Event("cartUpdated"));
        return { success: true };
      }
    } catch (error) {
      console.log("Add Cart Error:", error);
      return { success: false };
    }
  };
 
  const removeItem = async (productId) => {
    // ... keep your existing removeItem code exactly as it is ...
    try {
      if (user?.id) {
        const response = await removeCartItemService(productId);
        if (response.success) {
          dispatch(setCartQty({ productId, quantity: 0 }));
          window.dispatchEvent(new Event("cartUpdated"));
        }
        return response;
      } else {
        let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        guestCart = guestCart.filter((item) => item.product_id !== productId);
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        dispatch(setCartQty({ productId, quantity: 0 }));
        window.dispatchEvent(new Event("cartUpdated"));
        return { success: true };
      }
    } catch (error) {
      console.log("Remove Item Error:", error);
      return { success: false };
    }
  };
 
  // =========================
  // SYNC GUEST CART ON LOGIN
  // =========================
  const syncGuestCart = async () => {
    try {
      let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
     
      if (guestCart.length === 0) return { success: true };
 
      // Use a for...of loop. If an item is out of stock (400 error),
      // the catch block handles it, but the loop continues syncing the remaining items!
      for (const item of guestCart) {
        try {
          await addToCartService(item.product_id, item.quantity);
        } catch (itemError) {
          console.log(`Failed to sync item ${item.product_id}:`, itemError);
        }
      }
 
      // Clear local storage after syncing
      localStorage.removeItem("guestCart");
 
      window.dispatchEvent(new Event("cartUpdated"));
 
      return { success: true };
    } catch (error) {
      console.log("Sync Cart Error:", error);
      return { success: false };
    }
  };
 
  return {
    addCart,
    removeItem,
    syncGuestCart,
  };
}