const addPizzaToCart = (pizzaObj) => ({
  type: "ADD_PIZZA_TO_CART",
  payload: pizzaObj,
});

const clearCart = () => ({
  type: "CLEAR_CART",
});

const removeCartItem = (id) => ({
  type: "REMOVE_CART_ITEM",
  payload: id
});

const plusItem = (id) => ({
  type: "PLUS_ITEM",
  payload: id
});

const minusItem = (id) => ({
  type: "MINUS_ITEM",
  payload: id
});

export { addPizzaToCart, clearCart, removeCartItem, plusItem, minusItem };
