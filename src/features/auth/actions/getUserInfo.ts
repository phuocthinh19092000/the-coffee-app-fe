import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../storage';
import GetUserData from '../api/UserData/GetUserData';
import { logout } from './login';

type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface DataUserState {
  loading?: RequestState;
  error?: any;
  userInfo: any;
}

export const initialState: DataUserState = {
  userInfo: {
    id: '',
    available: '',
    freeUnit: 0,
    phoneNumber: '',
    email: '',
    name: '',
  },
  loading: 'pending',
  error: {
    message: '',
    status: null,
  },
};

export const getUserData = createAsyncThunk('/users/profile', async (_, { rejectWithValue }) => {
  try {
    const responseUserData = await GetUserData.getUserData();
    return responseUserData.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const getDataSlice = createSlice({
  name: 'getData',
  initialState,
  reducers: {
    updateFreeUnit: (state, action: PayloadAction<number>) => {
      const newFreeUnit = state.userInfo.freeUnit - action.payload;
      state.userInfo.freeUnit = newFreeUnit > 0 ? newFreeUnit : 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.userInfo = action.payload;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(logout, () => initialState);
  },
});

export const getUserDataState = (state: RootState) => state.userData.userInfo;
export const { updateFreeUnit } = getDataSlice.actions;
export default getDataSlice.reducer;
