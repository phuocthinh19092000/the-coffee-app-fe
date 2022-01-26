import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderStatus } from '../../../enum/Order';
import Order from '../../../interfaces/order';
import { RootState } from '../../../storage';
import OrderByStatusApi from '../api/orderStatusApi';

type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface AuthState {
  data: {
    orderStatusNew: Order[];
    orderStatusProcessing: Order[];
    orderStatusReady: Order[];
  };
  loading?: RequestState;
  error?: any;
}

export const initialState: AuthState = {
  data: {
    orderStatusNew: [],
    orderStatusProcessing: [],
    orderStatusReady: [],
  },
  loading: 'pending',
  error: {
    message: '',
    status: null,
  },
};

export const getOrdersByStatus = createAsyncThunk(
  '/orders/status',
  async (orderStatus: OrderStatus, { rejectWithValue }) => {
    try {
      const response = await OrderByStatusApi.getOrdersByStatus(orderStatus);

      return {
        status: orderStatus,
        orders: response.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

const orderByStatusSlice = createSlice({
  name: 'orderByStatus',
  initialState,
  reducers: {
    addNewOrder: (state, action: PayloadAction<Order>) => {
      state.data.orderStatusNew.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersByStatus.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getOrdersByStatus.fulfilled, (state, action) => {
        state.loading = 'fulfilled';

        switch (action.payload.status) {
          case OrderStatus.NEW:
            state.data.orderStatusNew = action.payload.orders;
            break;

          case OrderStatus.PROCESSING:
            state.data.orderStatusProcessing = action.payload.orders;
            break;

          case OrderStatus.READY_FOR_PICKUP:
            state.data.orderStatusReady = action.payload.orders;
            break;
        }
      })
      .addCase(getOrdersByStatus.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });
  },
});

export const selectOrderByStatusState = (state: RootState) => state.orderByStatus.data;
export const { addNewOrder } = orderByStatusSlice.actions;
export default orderByStatusSlice.reducer;
