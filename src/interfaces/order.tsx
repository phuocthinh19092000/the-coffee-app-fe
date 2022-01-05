import Product from './product';
export default interface Order {
  id: string;
  note: string;
  quantity: number;
  createdAt: string;
  productId: Product;
  orderStatus: string;
}