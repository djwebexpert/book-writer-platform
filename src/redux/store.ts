import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import homeSlice from "./features/homeSlice";
import collaboratorSlice from "./features/collaboratorSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  homeSlice,
  collaboratorSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
