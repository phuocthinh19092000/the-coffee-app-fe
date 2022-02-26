import { Product } from '../../../interfaces';
import productApi, { UpdateProductParams } from '../api/productAPI';
import { RootState } from '../../../storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CreateProductState {
  loading: string;
  data: Product;
  error?: any;
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
  error: {
    message: '',
    status: null,
  },
};

export const createProduct = createAsyncThunk('/create-products', async (body: FormData, { rejectWithValue }) => {
  try {
    const products = await productApi.createProduct(body);
    return products.data;
  } catch (error: any) {
    return rejectWithValue(error.data);
  }
});

export const updateProduct = createAsyncThunk(
  '/update-products',
  async (updateProductParams: UpdateProductParams, { rejectWithValue }) => {
    try {
      const products = await productApi.updateProduct(updateProductParams);
      return products.data;
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);

const createProductSlice = createSlice({
  name: 'productForStaff',
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
        state.error = initialState.error;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
        state.error = initialState.error;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });
  },
});

export const selectCreateProductState = (state: RootState) => state.createProduct.data;
export default createProductSlice.reducer;
