import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoryApi from '../api/categoryAPI';
import { RootState } from '../../../storage';
import Category from '../../../interfaces/category';
import { RequestState } from '../../../enum';
export interface CategoryState {
  loading: RequestState;
  data: Category[];
}
export const initialState: CategoryState = {
  loading: RequestState.PENDING,
  data: [],
};

export const getAllCategory = createAsyncThunk('/categories', async () => {
  const allCategory = await categoryApi.getAll();
  return allCategory.data;
});

export const getCategory = createAsyncThunk('/categories/name-categories', async (name: string) => {
  const category = await categoryApi.get(name);
  return category.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(getAllCategory.rejected, (state) => {
        state.loading = RequestState.REJECTED;
      });
  },
});

export const selectCategoryState = (state: RootState) => state.category.data;

export default categorySlice.reducer;
