import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productApi from '../api/productAPI';
import { RootState } from '../../../storage';

export const initialState = {
  data: {},
};

export const getProductByCategory = createAsyncThunk('/categories/${name}/products', async (name: string) => {
  const productByCategory = await productApi.getByCategory(`${name}`);
  return productByCategory.data;
});
export const getAllProduct = createAsyncThunk('/products', async () => {
  const allProduct = await productApi.getAllProduct();
  return allProduct.data;
});
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export const selectProductState = (state: RootState) => state.product.data;

export default productSlice.reducer;
