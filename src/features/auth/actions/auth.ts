import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Auth from '../api/Token/Auth';
import { LogoutParams, UserParams } from '../api/Token/types';
import { RootState } from '../../../storage';
import http from '../../../services/http-common';
import GetUserData from '../api/UserData/GetUserData';
import { UserInfor } from '../types/userInfor.type';
import { RequestState, ROLE } from '../../../enum';

export interface AuthState {
  loading?: RequestState;
  error?: any;
  data: UserInfor;
}

export const initialState: AuthState = {
  data: {
    jwtAccessToken: '',
    userInfor: {
      role: '',
      avatarUrl: '',
      freeUnit: 0,
      phoneNumber: '',
      email: '',
      name: '',
      _id: '',
    },
  },
  loading: RequestState.PENDING,
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

export const getFreeUnit = createAsyncThunk('/users/freeunit', async (_, { rejectWithValue }) => {
  try {
    const responseUserFreeUnit = await GetUserData.getFreeUnit();
    return responseUserFreeUnit.data;
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
    checkRole: (state, action: PayloadAction<ROLE[]>) => {
      if (!action.payload.includes(state.data.userInfor.role as ROLE)) {
        return initialState;
      }
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
        state.data = initialState.data;
      })
      .addCase(logout.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      })
      .addCase(getFreeUnit.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getFreeUnit.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        state.data.userInfor.freeUnit = action.payload;
      })
      .addCase(getFreeUnit.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectLoginState = (state: RootState) => state.authData.data.jwtAccessToken;
export const selectUserState = (state: RootState) => state.authData.data.userInfor;
export const { updateFreeUnit, checkRole, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
