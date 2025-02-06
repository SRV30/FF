import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra/darkModeSlice";
import authReducer from "./auth-slice/user";
import productReducer from "./auth-slice/productSlice";
import addressReducer from "./address-slice/addressSlice";
import updatePassSlice from "./update-password/updatePasswordSlice";
const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    product: productReducer,
    address: addressReducer,
    updatePassword:updatePassSlice
  },
});

export default store;
