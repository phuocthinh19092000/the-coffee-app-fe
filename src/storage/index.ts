import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/actions/login';
import categoryReducer from '../features/Product/actions/getCategoryData'
import productReducer from '../features/Product/actions/getProductData'
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
  middleware: customizedMiddleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
