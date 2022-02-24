import { RootState } from '../../../storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Account from '../../../interfaces/account';
import accountApi from '../api/accountAPI';
import { UserTypeDto } from '../../../interfaces';

export interface CreateAccountState {
  loading: string;
  data: Account;
  error?: any;
}

export const initialState: CreateAccountState = {
  loading: 'pending',
  data: {
    id: '',
    username: '',
    password: '',
    name: '',
    email: '',
    phoneNumber: '',
    role: {
      id: '',
      name: '',
    },
    avatarUrl: '',
    available: '',
    freeUnit: 0,
  },
  error: {
    message: '',
    status: null,
  },
};

export const createAccount = createAsyncThunk('/admin/account', async (body: UserTypeDto, { rejectWithValue }) => {
  try {
    const account = await accountApi.createAccount(body);
    return account.data;
  } catch (error: any) {
    return rejectWithValue(error.data);
  }
});

const createAccountSlice = createSlice({
  name: 'createProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });
  },
});

export const selectCreateAccountState = (state: RootState) => state.createAccount.data;

export default createAccountSlice.reducer;
