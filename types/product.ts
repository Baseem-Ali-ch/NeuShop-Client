export interface Product {
  _id: { $oid: string };
  name: string;
  description: string;
  sku: string;
  brandId: string;
  categoryId: string;
  tags: string[];
  price: number;
  salePrice?: number;
  stock: number;
  lowStockThreshold: number;
  images: string[];
  variants?: {
    type: string;
    options: {
      value: string;
      images: string[];
      _id: { $oid: string };
    }[];
    _id: { $oid: string };
  }[];
  status: boolean;
  __v: number;
  slug: string;
  rating?: number; 
  reviewCount?: number;
  sizes?: string[]; 
}