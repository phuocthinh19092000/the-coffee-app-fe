import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productApi from '../api/productAPI';
import { RootState } from '../../../storage';
import { Product } from '../../../interfaces';

export interface ProductState {
  loading: string;
  data: {
    products: Product[];
    totalProduct: number;
  };
}
export const initialState: ProductState = {
  loading: 'pending',
  data: {
    products: [],
    totalProduct: 0,
  },
};

export const getAllProduct = createAsyncThunk('/products', async () => {
  const allProduct = await productApi.getAllProduct();
  return allProduct.data;
});

export const getProductsPagination = createAsyncThunk(
  '/products?limit=&offset=',
  async (queryParams: { limit?: number; offset?: number }, { rejectWithValue }) => {
    try {
      const products = await productApi.getProductPagination(queryParams);
      return products.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

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
        state.data.products = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.loading = 'rejected';
      })
      .addCase(getProductsPagination.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getProductsPagination.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getProductsPagination.rejected, (state) => {
        state.loading = 'rejected';
      });
  },
});

export const selectProductState = (state: RootState) => state.product.data;

export default productSlice.reducer;
