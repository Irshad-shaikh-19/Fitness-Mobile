import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slice/authSlice";
import { landingPageApi } from "./api/pages/landingPageApi";
import { footerApi } from "./api/pages/footerApi";
import { footerSupportApi } from "./api/pages/footerSupportApi";

const authPersistConfig = {
  key: "auth",
  storage,
  // Add whitelist/blacklist if needed
  // whitelist: ['token', 'user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [landingPageApi.reducerPath]: landingPageApi.reducer,
  [footerApi.reducerPath]: footerApi.reducer,
  [footerSupportApi.reducerPath]: footerSupportApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(landingPageApi.middleware)
      .concat(footerApi.middleware)
      .concat(footerSupportApi.middleware),
});

export const persistor = persistStore(store);
