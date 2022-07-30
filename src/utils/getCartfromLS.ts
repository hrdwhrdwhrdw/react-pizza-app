import { calcTotalPrice } from "./calcTotalPrice";
import { calcTotalCount } from "./calcTotalCount";
import { CartItemType } from "../redux/cart/types";
export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? (JSON.parse(data) as CartItemType[]) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calcTotalCount(items);
  return {
    items,
    totalPrice,
    totalCount,
  };
};
