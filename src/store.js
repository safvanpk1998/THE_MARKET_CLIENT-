import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import productSlice from "./slices/productSlice"

import userSlice from "./slices/authSlice"
import  productDetailSlice from "./slices/productDetailSlice";
import  orderSlice from "./slices/orderSlice";
// import  orderDetailsSlice from "./slices/orderDetailsSlice";
import  wishListSlice from "./slices/wishListSlice";
import  adminSlice from "./slices/adminSlice";
import  stockerSlice from "./slices/stockerSlice";


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["order"]
}

const reducer =combineReducers( {
  
  products:productSlice,
  user:userSlice,
  order:orderSlice,
  productDetails:productDetailSlice,
  wishList:wishListSlice,
  admin:adminSlice,
  stocker:stockerSlice
 
});
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store)
