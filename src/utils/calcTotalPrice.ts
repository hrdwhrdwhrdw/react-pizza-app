import { CartItemType } from "../redux/cart/types";
export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};
