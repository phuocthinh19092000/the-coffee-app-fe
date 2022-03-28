import http from '../../../services/http-common';
import { createOrderParams, updateOrderParams } from './orderParams';

export default class Order {
  static placeOrder(body: createOrderParams) {
    return http.post('/orders', body);
  }
  static updateOrder(updateOrderParams: updateOrderParams) {
    return http.patch(`/orders/me/${updateOrderParams.orderId}`, updateOrderParams.body);
  }
}
