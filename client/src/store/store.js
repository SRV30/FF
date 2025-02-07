import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra-slice/darkModeSlice";
import authReducer from "./auth-slice/user";
import productReducer from "./product-slice/productSlice";
import addressReducer from "./address-slice/addressSlice";
import updatePassSlice from "./auth-slice/updatePasswordSlice";
import productDetailsSlice from "./product-slice/productDetails";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    product: productReducer,
    address: addressReducer,
    updatePassword: updatePassSlice,
    productDetails: productDetailsSlice,
  },
});

export default store;
