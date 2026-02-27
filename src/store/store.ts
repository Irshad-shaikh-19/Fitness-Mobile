import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slice/authSlice";
import { landingPageApi } from "./api/pages/landingPageApi";
import { footerApi } from "./api/pages/footerApi";
import { footerSupportApi } from "./api/pages/footerSupportApi";
import { masterApi } from "./api/pages/masterApi";
import { videoApi } from "./api/pages/videoApi";
import { recommendationApi } from "./api/pages/recommendationApi";
import { mobileHeroSliderApi } from "./api/pages/mobileHeroSliderApi";
import { myListApi } from "./api/pages/myListApi";
import { videoDownloadApi } from "./api/pages/videoDownloadApi";
import { emailAlertSettingApi } from "./api/pages/emailAlertSettingApi";


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
  [masterApi.reducerPath]: masterApi.reducer,
  [videoApi.reducerPath]: videoApi.reducer,
  [recommendationApi.reducerPath]: recommendationApi.reducer,
  [mobileHeroSliderApi.reducerPath]: mobileHeroSliderApi.reducer,
  [myListApi.reducerPath]: myListApi.reducer,
  [videoDownloadApi.reducerPath]: videoDownloadApi.reducer,
  [emailAlertSettingApi.reducerPath]: emailAlertSettingApi.reducer,


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
      .concat(footerSupportApi.middleware)
      .concat(masterApi.middleware)
      .concat(videoApi.middleware)
      .concat(recommendationApi.middleware)
      .concat(mobileHeroSliderApi.middleware)
      .concat(myListApi.middleware)
      .concat(videoDownloadApi.middleware)
      .concat(emailAlertSettingApi.middleware)

});

export const persistor = persistStore(store);
