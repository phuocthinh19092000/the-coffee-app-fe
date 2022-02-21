export default interface Product {
  id: string;
  name?: string;
  images?: string;
  category?: string;
  price: number;
  status?: string;
  description?: string;
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
