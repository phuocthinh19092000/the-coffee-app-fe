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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = 'fulfilled';
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });
  },
});

export const selectLoginState = (state: RootState) => state.authData.accessToken;
export default authSlice.reducer;
