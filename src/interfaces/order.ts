export default interface Order {
  id: string;
  note: string;
  quantity: number;
  createdAt: string;
  product: {
    id: string;
    name: string;
    images: string;
    price: number;
  };
  orderStatus: {
    id: string;
    name: string;
    value: number;
  };
  userId: string;
  quantityBilled: number;
}

export interface OrderSocket {
  order: Order;
  newOrderStatus?: string;
}
