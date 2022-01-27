import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderStatus } from '../../../enum/Order';
import Order from '../../../interfaces/order';
import { RootState } from '../../../storage';
import OrderByStatusApi from '../api/orderStatusApi';

type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface OrderByStatusState {
  data: {
    orderStatusNew: Order[];
    orderStatusProcessing: Order[];
    orderStatusReady: Order[];
  };
  loading?: RequestState;
  error?: any;
}

export const initialState: OrderByStatusState = {
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

function prepare(order: Order, newStatus: OrderStatus) {
  return {
    payload: {
      order,
      newStatus,
    },
  };
}
export const updateOrder = createAction('orderByStatus/addOrder', prepare);

const orderByStatusSlice = createSlice({
  name: 'orderByStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder, (state, action) => {
        switch (action.payload.newStatus) {
          case OrderStatus.NEW:
            state.data.orderStatusNew.push(action.payload.order);
            break;

          case OrderStatus.PROCESSING:
            state.data.orderStatusProcessing.push(action.payload.order);
            state.data.orderStatusNew = state.data.orderStatusNew.filter(
              (order) => order.id !== action.payload.order.id,
            );
            break;

          case OrderStatus.READY_FOR_PICKUP:
            state.data.orderStatusReady.push(action.payload.order);
            state.data.orderStatusProcessing = state.data.orderStatusProcessing.filter(
              (order) => order.id !== action.payload.order.id,
            );
            break;

          case OrderStatus.CANCELED:
            state.data.orderStatusNew = state.data.orderStatusNew.filter(
              (order) => order.id !== action.payload.order.id,
            );
            break;
        }
      })
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
export default orderByStatusSlice.reducer;
