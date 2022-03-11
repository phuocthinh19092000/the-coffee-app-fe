import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderStatus, RequestState } from '../../../enum';
import Order from '../../../interfaces/order';
import { RootState } from '../../../storage';
import OrderByStatusApi from '../api/orderStatusApi';

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
  loading: RequestState.PENDING,
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

function prepare(order: Order, newStatus?: OrderStatus, currentStatus?: OrderStatus) {
  return {
    payload: {
      order,
      newStatus,
      currentStatus,
    },
  };
}
export const updateOrder = createAction('orderByStatus/addOrder', prepare);

const removeOrderInColumn = (order: Order, listOrderStatus: Order[]) =>
  listOrderStatus.filter((item) => item.id !== order.id);

const addOrderInColumn = (order: Order, listOrderStatus: Order[]) => {
  const duplicateOrder = listOrderStatus.find((ord) => ord === order);
  if (!duplicateOrder) {
    listOrderStatus.push(order);
  }
};

const orderByStatusSlice = createSlice({
  name: 'orderByStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder, (state, action) => {
        switch (action.payload.newStatus) {
          case OrderStatus.NEW:
            addOrderInColumn(action.payload.order, state.data.orderStatusNew);
            break;
          case OrderStatus.PROCESSING:
            state.data.orderStatusNew = removeOrderInColumn(action.payload.order, state.data.orderStatusNew);
            addOrderInColumn(action.payload.order, state.data.orderStatusProcessing);
            break;
          case OrderStatus.READY_FOR_PICKUP:
            state.data.orderStatusProcessing = removeOrderInColumn(
              action.payload.order,
              state.data.orderStatusProcessing,
            );
            addOrderInColumn(action.payload.order, state.data.orderStatusReady);
            break;
          case OrderStatus.CANCELED:
            if (action.payload.currentStatus === OrderStatus.NEW) {
              state.data.orderStatusNew = removeOrderInColumn(action.payload.order, state.data.orderStatusNew);
            } else {
              state.data.orderStatusProcessing = removeOrderInColumn(
                action.payload.order,
                state.data.orderStatusProcessing,
              );
            }
            break;
          case OrderStatus.DONE:
            state.data.orderStatusReady = removeOrderInColumn(action.payload.order, state.data.orderStatusReady);
        }
      })
      .addCase(getOrdersByStatus.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getOrdersByStatus.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
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
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectOrderByStatusState = (state: RootState) => state.orderByStatus.data;
export default orderByStatusSlice.reducer;
