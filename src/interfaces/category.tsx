import Product from './product';
export default interface Category {
  _id: string;
  name: string;
  products: Product[];
}
