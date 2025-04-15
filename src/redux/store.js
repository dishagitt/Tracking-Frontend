import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; 
import sidebarReducer from "./features/sidebar/sidebarSlice"; 
import winnerReducer from "./features/compDetails/winnerCardSlice"; 
import teamInfoReducer from "./features/teamInfo/teamInfoSlice";
import competitionReducer from "./features/compDetails/competitionSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

// Persist Config
const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Define storage type
};

// Wrap auth reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Use persisted reducer
    sidebar: sidebarReducer, // User Sidebar reducer
    winners: winnerReducer, // winner details reducer
    teamInfo: teamInfoReducer, // team Info reducer 
    competition: competitionReducer // competiton progress tracker reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create Persistor
export const persistor = persistStore(store);
export default store;
