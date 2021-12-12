import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Auth from '../api';
import http from '../../../services/http-common';
import { UserParams } from '../api/types';
import { RootState } from '../../../storage';

type RequestState = 'pending' | 'fulfilled' | 'rejected'

export interface AuthState {
  loading?: RequestState,
  error?: any,
  accessToken?: string
}

export const initialState: AuthState = {
  accessToken: '',
  loading: 'pending',
  error: {
    message: '',
    status: null
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (body: UserParams, { rejectWithValue }) => {
    console.log('is that login')
    try {
      const response = await Auth.login(body);
      http.setAuthorizationHeader(response.data.accessToken)
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.accessToken = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = 'rejected'
      state.error = action.payload
    })
  },
});

export const selectLoginState = (state: RootState) => state.login;

export default loginSlice.reducer;
