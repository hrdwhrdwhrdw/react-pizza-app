const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_TO_CART":
      const newItem = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload],
      };

      const allPizzas = [].concat.apply([], Object.values(newItem));

      return {
        ...state,
        items: newItem,
        totalCount: allPizzas.length,
        totalPrice: allPizzas.reduce((sum, obj) => obj.price + sum, 0),
      };

    default:
      return state;
  }
};

export default cart;
