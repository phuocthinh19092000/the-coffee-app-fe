import http from '../../../services/http-common';
import { UserParams } from './types';

export default class Auth {
  static login(body: UserParams) {
    return http.post('/auth/local', body);
  }
}
