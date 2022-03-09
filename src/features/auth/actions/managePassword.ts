import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChangePasswordParams, ManagePasswordApi } from '../api/UserData/ManagePassword';

export const changePassword = createAsyncThunk(
  '/auth/change-password',
  async (body: ChangePasswordParams, { rejectWithValue }) => {
    try {
      const response = await ManagePasswordApi.changePassword(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);
