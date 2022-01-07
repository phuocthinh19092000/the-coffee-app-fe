import http from '../../../services/http-common';

const productApi = {
  getAllProduct() {
    const url = `/products`;
    return http.get(url);
  },
  getByCategory(name: string) {
    const url = `/categories/${name}/products`;
    return http.get(url);
  },
};
export default productApi;
