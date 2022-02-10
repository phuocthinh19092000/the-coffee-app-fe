import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NotificationPickUpOrderApi, { BodyApiNotificationPickUpOrder } from '../api/sendNotificationPickUpOrder';
type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface NotificationState {
  loading?: RequestState;
  error?: any;
}

export const initialState: NotificationState = {
  loading: 'pending',
  error: {
    message: '',
    status: null,
  },
};

export const sendNotificationRemindPickUpOrder = createAsyncThunk(
  '/notifications/remind',
  async (body: BodyApiNotificationPickUpOrder, { rejectWithValue }) => {
    try {
      const response = await NotificationPickUpOrderApi.send(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendNotificationRemindPickUpOrder.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(sendNotificationRemindPickUpOrder.fulfilled, (state) => {
        state.loading = 'fulfilled';
      })
      .addCase(sendNotificationRemindPickUpOrder.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
