import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authApi";
import authReducer from "../slices/authSlice";
import { vnLocationApi } from "../services/vnLocationApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
    [vnLocationApi.reducerPath]: vnLocationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, vnLocationApi.middleware),
});

setupListeners(store.dispatch);
