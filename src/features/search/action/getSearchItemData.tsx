import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../storage';
import searchAPI from '../api/searchAPI';
import Product from '../../../interfaces/product';

export interface ProductState {
  loading: string;
  data: Product[];
  error?: any;
}

export const initialState: ProductState = {
  loading: 'pending',
  data: [],
  error: {
    message: '',
    status: null,
  },
};

export const getSearchItems = createAsyncThunk(
  '/products/search?keyword=name',
  async (name: string, { rejectWithValue }) => {
    try {
      const allItems = await searchAPI.getByName(name);
      return allItems.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchItems.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getSearchItems.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getSearchItems.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });
  },
});

export const selectSearchState = (state: RootState) => state.search.data;

export default searchSlice.reducer;
