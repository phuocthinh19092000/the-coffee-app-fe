import http from '../../../services/http-common';

export default class UpdateStatusOrderApi {
  static updateStatusOrder(id: string, newStatus: number, userId: string) {
    return http.patch(`/orders/${id}`, { status: newStatus, userId: userId });
  }
}
