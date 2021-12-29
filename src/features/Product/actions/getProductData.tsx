import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productApi from '../api/productAPI';
import { RootState } from '../../../storage';
import Product from '../../../interfaces/product';

export interface ProductState {
  loading: string;
  data: Product[];
}
export const initialState: ProductState = {
  loading: 'pending',
  data: [],
};

export const getAllProduct = createAsyncThunk('/products', async () => {
  const allProduct = await productApi.getAllProduct();
  return allProduct.data;
});
export const getProductsByCategory = createAsyncThunk('/categories/name-categories/products', async (name: string) => {
  const productByCategory = await productApi.getByCategory(name);
  return productByCategory.data;
});
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.loading = 'rejected';
      });
  },
});

export const selectProductState = (state: RootState) => state.product.data;

export default productSlice.reducer;
