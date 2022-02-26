import http from '../../../services/http-common';
import { UserTypeDto } from '../../../interfaces';

const url = `/admin/account`;
const accountApi = {
  createAccount(body: UserTypeDto) {
    return http.post(url, body);
  },
};
export default accountApi;
