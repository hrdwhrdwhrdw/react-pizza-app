export interface CartItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface CartSliceType {
  totalPrice: number;
  totalCount: number;
  items: CartItemType[];
}