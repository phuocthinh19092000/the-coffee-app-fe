import http from '../../../../services/http-common';

export default class GetUserData {
  static getUserData() {
    return http.get('/users/profile');
  }
  static getFreeUnit() {
    return http.get('/users/freeunit');
  }
}
