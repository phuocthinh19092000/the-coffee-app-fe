import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Order from '../../../interfaces/order';
import { RootState } from '../../../storage';
import UpdateStatusOrderApi from '../api/updateOrderApi';

type RequestState = 'pending' | 'fulfilled' | 'rejected';

export interface UpdateStatusOrder {
  order: Order;
  loading?: RequestState;
  error?: any;
}

export const initialState: UpdateStatusOrder = {
  order: {
    product: {
      price: 0,
      name: '',
      id: '',
      images: '',
    },
    quantityBilled: 0,
    orderStatus: {
      id: '',
      name: '',
      value: 0,
    },
    note: '',
    quantity: 0,
    user: {
      id: '',
      name: '',
      phoneNumber: '',
    },
    createdAt: '',
    id: '',
  },
  loading: 'pending',
  error: {
    message: '',
    status: null,
  },
};

export const updateStatusOrder = createAsyncThunk(
  '/orders/{id}',
  async (data: { id: string; newStatus: number }, { rejectWithValue }) => {
    try {
      const response = await UpdateStatusOrderApi.updateStatusOrder(data.id, data.newStatus);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

const updateStatusOrderSlice = createSlice({
  name: 'updateStatusOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStatusOrder.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.order = action.payload;
      })
      .addCase(updateStatusOrder.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });
  },
});

export const updateStatusOrderState = (state: RootState) => state.updateStatusOrder.order;

export default updateStatusOrderSlice.reducer;
