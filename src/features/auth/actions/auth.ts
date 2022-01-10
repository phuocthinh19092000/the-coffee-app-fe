import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Auth from '../api/Token/Auth';
import { LogoutParams, UserParams } from '../api/Token/types';
import { RootState } from '../../../storage';
import http from '../../../services/http-common';
type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface AuthState {
  loading?: RequestState;
  error?: any;
  accessToken?: string;
}

export const initialState: AuthState = {
  accessToken: '',
  loading: 'pending',
  error: {
    message: '',
    status: null,
  },
};

export const login = createAsyncThunk('/auth/login', async (body: UserParams, { rejectWithValue }) => {
  try {
    const responseAccessToken = await Auth.login(body);
    http.setAuthorizationHeader(responseAccessToken.data.jwtAccessToken);
    return responseAccessToken.data.jwtAccessToken;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});
export const logout = createAsyncThunk('/auth/logout', async (body: LogoutParams, { rejectWithValue }) => {
  try {
    await Auth.logout(body);
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});

export const logoutSlide = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(logout.fulfilled, (state) => {
        state = initialState;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = 'rejected';
      });
  },
});
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.accessToken = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
  },
});

export const selectLoginState = (state: RootState) => state.login.accessToken;
export default loginSlice.reducer;
