import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra-slice/darkModeSlice";
import authReducer from "./auth-slice/user";
import productReducer from "./product-slice/productSlice";
import addressReducer from "./address-slice/addressSlice";
import updatePassSlice from "./auth-slice/updatePasswordSlice";
import productDetailsSlice from "./product-slice/productDetails";
import otpSlice from "./auth-slice/otpSlice";
import adminProductSlice from "./product-slice/AdminProduct";
import cartReducer from "./add-to-cart/addToCart";
import wishListReducer from "./add-to-wishList/addToWishList";
import orderReducer from "./order-slice/order";
import discountReducer from "./extra-slice/discount";
import onlineReducer from "./order-slice/order";
import adminOrdersReducer from "./order-slice/AdminOrderSlice";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    product: productReducer,
    address: addressReducer,
    updatePassword: updatePassSlice,
    productDetails: productDetailsSlice,
    otp: otpSlice,
    adminProduct: adminProductSlice,
    cart: cartReducer,
    wishList: wishListReducer,
    order: orderReducer,
    discount: discountReducer,
    online: onlineReducer,
    adminOrders: adminOrdersReducer
  },
});

export default store;
