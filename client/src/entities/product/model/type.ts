export type GetAllProduct = {
  id: number;
  productName: string;
  categoryName: string;
};

export interface FormProductState {
  productName: string;
  amount: number;
  price: string;
  categoryId: Set<number>;
  baseUnitName: string;
  packageUnitName: string;
  itemsPerPackage: number;
  imageUrl: string;
}

export interface ComboFormState {
  offerName: string;
  requiredQuantity: number;
  giftItemId: number | "";
  giftQuantity: number;
  isMandatory: boolean;
  startDate: string;
  endDate: string;
}

export interface CreateProductRequest
  extends Omit<FormProductState, "categoryId"> {
  categoryId: number[];
  combos: ComboFormState[];
}
