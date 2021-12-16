import http from '../../../../services/http-common';

export default class GetUserData {
  static getUserData(url: string, data?: any) {
    return http.get('/users/profile', { params: data });
  }
}
