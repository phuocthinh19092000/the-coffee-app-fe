import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Order from '../api/orderAPI';
import { orderParams } from '../api/orderParams';
import { RootState } from '../../../storage';
import http from '../../../services/http-common';
type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface OrderDetail {
  loading?: RequestState;
  error?: any;
  orderData?: any;
}

export const initialState: OrderDetail = {
  loading: 'pending',
  error: {
    message: '',
    status: null,
  },
  orderData: {
    quantity: 1,
    note: '',
    productId: '',
  },
};

export const order = createAsyncThunk('/orders', async (body: orderParams, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!!token) {
      http.setAuthorizationHeader(token);
      const responseOrderData = await Order.order(body);
      return responseOrderData.data;
    }
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.orderData.quantity += 1;
    },
    decrement: (state) => {
      state.orderData.quantity -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.orderData.quantity += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(order.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(order.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.orderData = action.payload;
    });
    builder.addCase(order.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
  },
});

export const selectOrderState = (state: RootState) => state.order.orderData;

export const { increment, decrement, incrementByAmount } = orderSlice.actions;
export default orderSlice.reducer;
