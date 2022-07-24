import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories, SortPopup, PizzaBlock, Skeleton } from "../components";
import { setCategory, setSortBy, setFilters } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { sortItems } from "../components/SortPopup";
import { useRef } from "react";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoading = useSelector(({ pizzas }) => pizzas.isLoading);
  const { category, sortBy, currentPage } = useSelector(
    ({ filters }) => filters
  );
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const [isMountedCount, setIsMountCount] = useState(0);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItems.find((obj) => obj.type === params.sort).type;
      const order = sortItems.find((obj) => obj.order === params.order).order;
      dispatch(setFilters({ ...params, sort, order }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPizzas(category, sortBy, searchValue, currentPage));
    }
    isSearch.current = false;
  }, [category, sortBy, searchValue, currentPage]);

  useEffect(() => {
    if (isMountedCount > 0) {
      const queryString = qs.stringify({
        category,
        currentPage,
        sort: sortBy.type,
        order: sortBy.order,
      });
      navigate(`?${queryString}`);
    }
    setIsMountCount(isMountedCount + 1);
  }, [category, sortBy, currentPage]);

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
          activeCategory={category}
        />
        <SortPopup
          activeSortType={sortBy.type}
          activeSortOrder={sortBy.order}
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
      <Pagination />
    </div>
  );
};

export default Home;
