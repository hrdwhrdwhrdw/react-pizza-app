import { CartItemType } from "../redux/cart/types";
export const calcTotalCount = (items: CartItemType[]) => {
  return items.reduce((sum, item) =>  item.count + sum, 0);
};
