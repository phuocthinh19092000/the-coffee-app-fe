import Product from '../../../interfaces/product';
import productApi from '../api/productAPI';
import { RootState } from '../../../storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CreateProductState {
  loading: string;
  data: Product;
}
export const initialState: CreateProductState = {
  loading: 'pending',
  data: {
    id: '',
    name: '',
    images: '',
    category: {
      id: '',
      name: '',
    },
    price: 0,
    status: '',
    description: '',
    totalCount: 0,
  },
};

export const createProduct = createAsyncThunk('/create-products', async (body: FormData, { rejectWithValue }) => {
  try {
    const products = await productApi.createProduct(body);
    return products.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

const createProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = 'rejected';
      });
  },
});

export const selectCreateProductState = (state: RootState) => state.createProduct.data;

export default createProductSlice.reducer;
