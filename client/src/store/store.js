import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra-slice/darkModeSlice";
import authReducer from "./auth-slice/user";
import productReducer from "./product-slice/productSlice";
import addressReducer from "./address-slice/addressSlice";
import updatePassSlice from "./auth-slice/updatePasswordSlice";

import cartReducer  from "./add-to-cart/addToCart";
import wishListReducer from "./add-to-wishList/addToWishList";
import orderReducer from "./order-slice/order";

import productDetailsSlice from "./product-slice/productDetails";
import otpSlice from "./auth-slice/otpSlice";


const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    product: productReducer,
    address: addressReducer,
    updatePassword: updatePassSlice,

    cart: cartReducer,
    wishList: wishListReducer,
    order: orderReducer

    productDetails: productDetailsSlice,
    otp: otpSlice

  },
});

export default store;
