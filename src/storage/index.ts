import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/actions/login';
import categoryReducer from '../features/product/actions/getCategoryData';
import productReducer from '../features/product/actions/getProductData';
import getUserDataReducer from '../features/auth/actions/getUserInfo';
import orderReducer from '../features/order/actions/order';
import myOrderReducer from '../features/my-order/actions/historyOrder'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
  isSerializable: false,
});
const persistAuthConfig = {
  key: 'auth',
  version: 1,
  storage,
};
const persistUserConfig = {
  key: 'user',
  version: 1,
  storage,
};
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedUserReducer = persistReducer(persistUserConfig, getUserDataReducer);
export const store = configureStore({
  reducer: {
    login: persistedAuthReducer,
    userData: persistedUserReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    myOrder: myOrderReducer,
  },
  middleware: customizedMiddleware,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
