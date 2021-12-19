import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoryApi from '../api/categoryAPI';
import { RootState } from '../../../storage';

export const initialState = {
  data: {},
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
});

export const selectCatelogyState = (state: RootState) => state.category.data;

export default categorySlice.reducer;
