import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/login/login";
import dashboard from "./features/dasboard/dashboard";
import modalslice from "./features/Modal/modal";
export const Store=configureStore({
    reducer:{login:loginSlice.reducer,dashboard:dashboard.reducer,modal:modalslice.reducer}
})
