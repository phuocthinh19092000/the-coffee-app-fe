import http from '../../../services/http-common';

type PaginationParams = {
  limit?: number;
  offset?: number;
};

const url = `/products`;
const productApi = {
  getAllProduct() {
    return http.get(url);
  },

  getProductPagination(paginationParams: PaginationParams) {
    return http.get(url, paginationParams);
  },

  getByCategory(name: string) {
    const url = `/categories/${name}/products`;
    return http.get(url);
  },

  createProduct(body: FormData) {
    return http.post(url, body);
  },
};
export default productApi;
