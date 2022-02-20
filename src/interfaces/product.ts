export default interface Product {
  id: string;
  name: string;
  images: string;
  category: {
    id: string;
    name: string;
  };
  price: number;
  status: string;
  description?: string;
  totalCount: number;
}

export interface ProductTable {
  id: string;
  name: string;
  images: string;
  category: string;
  price: number;
  status: string;
}
export interface ProductTypeDto {
  id?: string;
  name: string;
  images?: File | string;
  category: string;
  price: string | number;
  status: string;
}
