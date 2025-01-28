import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./extra/darkModeSlice";
import authReducer from "./auth-slice/user";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
  },
});

export default store;
