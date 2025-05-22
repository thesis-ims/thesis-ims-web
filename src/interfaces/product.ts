export interface ProductProps {
  id?: string;
  name: string;
  description?: string;
  quantity: number;
  images: string[];
  createdDate?: string;
  lut?: string;
  createdBy?: string;
}

export interface ProductStocksSummary {
  available: number;
  lowStock: number;
  emptyStock: number;
}

export interface GetAllProductProps {
  object: ProductProps[];
  otherInfo: ProductStocksSummary;
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
