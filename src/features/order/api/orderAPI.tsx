import http from '../../../services/http-common';
import { orderParams } from './orderParams';

export default class Order {
  static placeOrder(body: orderParams) {
    return http.post('/orders', body);
  }
}
