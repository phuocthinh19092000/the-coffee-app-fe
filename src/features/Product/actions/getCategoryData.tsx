import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoryApi from '../api/categoryAPI';
import { RootState } from '../../../storage';
import Category from '../../../interfaces/category';
export interface CategoryState {
  loading: string;
  data: Category[];
}
export const initialState: CategoryState = {
  loading: 'pending',
  data: [],
};

export const getAllCategory = createAsyncThunk('/categories', async () => {
  const allCategory = await categoryApi.getAll();
  return allCategory.data;
});

export const getCategory = createAsyncThunk('/categories/${name}', async (name: string) => {
  const category = await categoryApi.get(`${name}`);
  return category.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export const selectCatelogyState = (state: RootState) => state.category.data;

export default categorySlice.reducer;
