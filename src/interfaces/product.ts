export interface ProductProps {
  id?: string;
  name: string;
  description?: string;
  quantity: number;
  images: string[];
  category: string;
  createdDate?: string;
  lut?: string;
  createdBy?: string;
  buyPrice: number;
  sellPrice: number;
}

export interface GetAllProductProps {
  object: ProductProps[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface ProductStocksSummary {
  available: number;
  lowStock: number;
  emptyStock: number;
}
export interface CategorySummary {
  label: string;
  value: number;
}

export interface ImportCsvProps {
  importType: string;
  csvData: string;
}
