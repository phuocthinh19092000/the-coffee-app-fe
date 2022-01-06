import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderHistory from '../api/historyAPI';
import { RootState } from '../../../storage';
import Order from '../../../interfaces/order'
type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface myOrdersDetails {
  loading: RequestState;
  error?: any;
  data: Order[];

}
export const initialState: myOrdersDetails = {
  loading: 'pending',
  data: [],
  error: {
    message: '',
    status: null,
  },
};
export const getMyOrders = createAsyncThunk('/user/orders', async (_, { rejectWithValue }) => {
  try {
    const responseMyOrderData = await OrderHistory.myOrders();
    return responseMyOrderData.data;
  } catch (error: any) {
    return rejectWithValue(error.data);
  }
});
const myOrderSlice = createSlice({
  name: 'myOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyOrders.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
  },
});

export const getMyOrderState = (state: RootState) => state.myOrder.data;
export default myOrderSlice.reducer;
