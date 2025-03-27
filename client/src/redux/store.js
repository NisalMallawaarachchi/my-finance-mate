import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage"; // Local storage
import { persistReducer, persistStore } from "redux-persist";

// Root reducer combining slices
const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,  // Using local storage
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allowing non-serializable values like persisted state
    }),
});

// Creating persistor for the store
export const persistor = persistStore(store);
