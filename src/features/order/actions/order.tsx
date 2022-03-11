import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Order from '../api/orderAPI';
import { orderParams } from '../api/orderParams';
import { RootState } from '../../../storage';
import { RequestState } from '../../../enum';

export interface OrderDetail {
  loading: RequestState;
  error?: any;
  orderData: orderParams;
}

export const initialState: OrderDetail = {
  loading: RequestState.PENDING,
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
      state.orderData.productId = action.payload;
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
      state.loading = RequestState.PENDING;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.loading = RequestState.FULFILLED;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = RequestState.REJECTED;
      state.error = action.payload;
    });
  },
});

export const selectOrderState = (state: RootState) => state.order.orderData;
export const { increment, decrement, resetOrder, getProductId, getNote, getQuantity } = orderSlice.actions;
export default orderSlice.reducer;
