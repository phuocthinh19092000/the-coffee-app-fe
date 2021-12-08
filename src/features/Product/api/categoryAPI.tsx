import http from '../../../services/http-common';

const categoryApi = {
  getAll() {
    const url = '/categories';
    return http.get(url);
  },

  get(name: string) {
    const url = `/categories/${name}`;
    return http.get(url);
  },
};
export default categoryApi;
