import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authApi";
import { woodworkerApi } from "../services/woodworkerApi";
import { designIdeaApi } from "../services/designIdeaApi";
import { ghnApi } from "../services/ghnApi";
import { servicePackApi } from "../services/servicePackApi";
import { walletApi } from "../services/walletApi";
import { transactionApi } from "../services/transactionApi";
import { twilioApi } from "../services/twilioApi";
import { paymentApi } from "../services/paymentApi";
import { meetApi } from "../services/meetApi";
import { userApi } from "../services/userApi";
import { decryptApi } from "../services/decryptApi";
import { categoryApi } from "../services/categoryApi";
import { availableServiceApi } from "../services/availableServiceApi";
import { reviewApi } from "../services/reviewApi";
import { postApi } from "../services/postApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [woodworkerApi.reducerPath]: woodworkerApi.reducer,
    [designIdeaApi.reducerPath]: designIdeaApi.reducer,
    [ghnApi.reducerPath]: ghnApi.reducer,
    [servicePackApi.reducerPath]: servicePackApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [twilioApi.reducerPath]: twilioApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [meetApi.reducerPath]: meetApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [decryptApi.reducerPath]: decryptApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [availableServiceApi.reducerPath]: availableServiceApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      woodworkerApi.middleware,
      designIdeaApi.middleware,
      ghnApi.middleware,
      servicePackApi.middleware,
      walletApi.middleware,
      transactionApi.middleware,
      twilioApi.middleware,
      paymentApi.middleware,
      meetApi.middleware,
      userApi.middleware,
      decryptApi.middleware,
      categoryApi.middleware,
      availableServiceApi.middleware,
      reviewApi.middleware,
      postApi.middleware
    ),
});

setupListeners(store.dispatch);
