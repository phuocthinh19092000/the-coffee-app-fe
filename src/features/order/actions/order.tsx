import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Order from '../api/orderAPI';
import { orderParams } from '../api/orderParams';
import { RootState } from '../../../storage';

type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface OrderDetail {
  loading: RequestState;
  error?: any;
  orderData: orderParams;
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
    product: '',
  },
};

export const placeOrder = createAsyncThunk('/orders', async (body: orderParams, { rejectWithValue }) => {
  try {
    const responseOrderData = await Order.placeOrder(body);
    return responseOrderData.data;
  } catch (error: any) {
    return rejectWithValue(error.data);
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
    getProductId: (state, action: PayloadAction<string>) => {
      state.orderData.product = action.payload;
    },
    getNote: (state, action: PayloadAction<string>) => {
      state.orderData.note = action.payload;
    },
    getQuantity: (state, action: PayloadAction<number>) => {
      state.orderData.quantity += action.payload;
    },
    resetOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.orderData = action.payload;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
  },
});

export const selectOrderState = (state: RootState) => state.order.orderData;
export const { increment, decrement, resetOrder, getProductId, getNote, getQuantity } = orderSlice.actions;
export default orderSlice.reducer;
