import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories, SortPopup, PizzaBlock, Skeleton } from "../components";
import {
  setCategory,
  setSortBy,
  setFilters,
} from "../redux/reducers/filterSlice";
import { fetchPizzasThunk } from "../redux/reducers/pizzasSlice";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { sortItems } from "../components/SortPopup";
import { useRef } from "react";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const dispatch = useDispatch();
  const {items, status} = useSelector((state) => state.pizzas);

  const { category, sortBy, currentPage } = useSelector(
    (state) => state.filter
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
      dispatch(
        fetchPizzasThunk({ currentPage, sortBy, category, searchValue })
      );
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchPizzasThunk({ currentPage, sortBy, category, searchValue })
      );
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

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickCategory={(catIndex) => onSelectCategory(catIndex)}
          activeCategory={category}
        />
        <SortPopup onClickSelectSort={onSelectSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-page">
          <h1>Произошла ошибка</h1>
          <p>К сожалению, не удалось загрузить пиицы, попробуйте еще раз</p>
        </div>
      ) : null}
      <div className="content__items">
        {status === "loading"
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
