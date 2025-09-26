export interface CreateProductFormType {
  brandCode: { value: any; label: string };
  categoryCode: { value: any; label: string };
  name: string;
  minStock: number;
  maxStock: number;
  costPrice: number;
  retailPrice: number;
  discountAmount: number;
  discountPercent: number;
  isBatch: any;
  isActive: any;
  itemType: string;
  image: any;
  description: string;
}
