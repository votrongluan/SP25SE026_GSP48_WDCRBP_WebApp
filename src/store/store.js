import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../slices/authSlice";
import vnLocationReducer from "../slices/vnLocationSlice";
import { authApi } from "../services/authApi";
import { vnLocationApi } from "../services/vnLocationApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vnLocation: vnLocationReducer,

    [authApi.reducerPath]: authApi.reducer,
    [vnLocationApi.reducerPath]: vnLocationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, vnLocationApi.middleware),
});

setupListeners(store.dispatch);
