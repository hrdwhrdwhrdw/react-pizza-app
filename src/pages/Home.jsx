import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories, SortPopup, PizzaBlock, Skeleton } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

const categories = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

const sortItems = [
  { name: "популярности", type: "popular", order: "desc" },
  { name: "цене", type: "price", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
];

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoading = useSelector(({ pizzas }) => pizzas.isLoading);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
    window.scrollTo(0, 0)
  }, [category, sortBy]);

  const onSelectCategory = useCallback((catIndex) => {
    dispatch(setCategory(catIndex));
  }, []);

  const onSelectSort = useCallback((sortType) => {
    dispatch(setSortBy(sortType));
  }, []);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickCategory={(catIndex) => onSelectCategory(catIndex)}
          items={categories}
          activeCategory={category}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSelectSort={(sortType) => onSelectSort(sortType)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={item.id}
                cartItemCount={
                  cartItems[item.id] && cartItems[item.id].items.length
                }
                {...item}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
