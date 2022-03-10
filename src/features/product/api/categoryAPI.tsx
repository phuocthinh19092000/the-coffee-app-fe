import { PaginationParams } from '../../../interfaces';
import http from '../../../services/http-common';

const categoryApi = {
  getAll(paginationParams?: PaginationParams) {
    const url = '/categories';
    return http.get(url, paginationParams);
  },

  get(name: string) {
    const url = `/categories/${name}`;
    return http.get(url);
  },
};
export default categoryApi;
