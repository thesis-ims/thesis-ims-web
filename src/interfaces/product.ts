export interface ProductProps {
  id?: string;
  name: string;
  quantity: number;
  images: string[];
  createdDate?: string;
  lut?: string;
  createdBy?: string;
}

export interface GetAllProductProps {
  object: ProductProps[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
