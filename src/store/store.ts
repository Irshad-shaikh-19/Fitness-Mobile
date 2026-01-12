import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ===== API Reducers (will be added as you create them) =====
// import { ottApi } from './api/ottApi';

// ===== Regular Reducers (will be added as you create them) =====
import authReducer from "./slice/authSlice";

// ===== Persist Configuration =====
const authPersistConfig = {
  key: "auth",
  storage,
  // Add whitelist/blacklist if needed
  // whitelist: ['token', 'user'],
};

// ===== Combine Reducers =====
const rootReducer = combineReducers({
  // Regular reducers
  auth: persistReducer(authPersistConfig, authReducer),
  // API reducers (RTK Query)
  // [ottApi.reducerPath]: ottApi.reducer,
});

// ===== Configure Store =====
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  // Add API middleware as you create them
  // .concat(ottApi.middleware)
});

export const persistor = persistStore(store);
