import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../storage';
import Account from '../../../interfaces/account';
import accountAPI from '../api/accountAPI';

export interface AccountState {
  loading: string;
  data: {
    user: Account[];
    totalUser: number;
  };
}

export const initialState: AccountState = {
  loading: 'pending',
  data: {
    user: [],
    totalUser: 0,
  },
};

export const getAllUser = createAsyncThunk('/users', async () => {
  const allUser = await accountAPI.getAllUser();
  return allUser.data;
});

export const getAccountPagination = createAsyncThunk(
  '/users?limit=&offset=',
  async (queryParams: { limit?: number; offset?: number }, { rejectWithValue }) => {
    try {
      const account = await accountAPI.getUserPagination(queryParams);
      return account.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountPagination.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getAccountPagination.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getAccountPagination.rejected, (state) => {
        state.loading = 'rejected';
      });
  },
});

export const selectAccountState = (state: RootState) => state.account.data;

export default accountSlice.reducer;
