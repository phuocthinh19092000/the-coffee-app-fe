import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Auth from '../api/Token/Auth';
import { LogoutParams, UserParams } from '../api/Token/types';
import { RootState } from '../../../storage';
import http from '../../../services/http-common';
import GetUserData from '../api/UserData/GetUserData';
import { UserInfor } from '../types/userInfor.type';
type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface AuthState {
  loading?: RequestState;
  error?: any;
  data: UserInfor;
}

export const initialState: AuthState = {
  data: {
    jwtAccessToken: '',
    userInfor: {
      role: {
        name: '',
      },
      avatarUrl: '',
      freeUnit: 0,
      phoneNumber: '',
      email: '',
      name: '',
    },
  },

  loading: 'pending',
  error: {
    message: '',
    status: null,
  },
};

export const login = createAsyncThunk('/auth/login', async (body: UserParams, { rejectWithValue }) => {
  try {
    const response = await Auth.login(body);
    http.setAuthorizationHeader(response.data.data.jwtAccessToken);
    return response.data.data;
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

export const getUserData = createAsyncThunk('/users/profile', async (_, { rejectWithValue }) => {
  try {
    const responseUserData = await GetUserData.getUserData();
    return responseUserData.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateFreeUnit: (state, action: PayloadAction<number>) => {
      const newFreeUnit = state.data.userInfor.freeUnit - action.payload;
      state.data.userInfor.freeUnit = newFreeUnit > 0 ? newFreeUnit : 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
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
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data.userInfor = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });
  },
});

export const selectLoginState = (state: RootState) => state.authData.data.jwtAccessToken;
export const selectUserState = (state: RootState) => state.authData.data.userInfor;
export const { updateFreeUnit } = authSlice.actions;
export default authSlice.reducer;
