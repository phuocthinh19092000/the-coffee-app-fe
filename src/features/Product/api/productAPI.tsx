import http from '../../../services/http-common';

const productApi = {
  getByCategory(name: string) {
    const url = `/categories/${name}/products`;
    return http.get(url);
  },
  getAllProduct() {
    const url = `/products`;
    return http.get(url);
  },
};
export default productApi;
