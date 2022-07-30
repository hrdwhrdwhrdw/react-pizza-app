import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { Categories, SortPopup, PizzaBlock, Skeleton, Pagination } from "../components";
import {
  setCategory,
  setFilters,
  setCurrentPage,
} from "../redux/filter/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { sortItems } from "../components/SortPopup";
import { RootState } from "../redux/store";
import { fetchPizzasThunk } from '../redux/asyncThunk';
import { useAppDispatch } from '../hooks/useAppDispatch';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: RootState) => state.pizzas);

  const { category, sortBy, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter
  );

  const navigate = useNavigate();
  const isSearch = useRef(false);
  const [isMountedCount, setIsMountCount] = useState(0);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const type = sortItems.find((obj) => obj.type === params.sort)?.type;
      const order = sortItems.find((obj) => obj.order === params.order)?.order;
      if (order && type) {
        let category = Number(params.category);
        let currentPage = Number(params.currentPage);
        dispatch(
          setFilters({ currentPage, category, sortBy: { type, order } })
        );
        dispatch(
          fetchPizzasThunk({ currentPage, sortBy, category, searchValue })
        );
      }
      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchPizzasThunk({ currentPage, sortBy, category, searchValue })
      );
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortBy, currentPage]);

  const onSelectCategory = useCallback((catIndex: number) => {
    dispatch(setCategory(catIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCurrentPage = useCallback((currentPage: number) => {
    dispatch(setCurrentPage(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickCategory={onSelectCategory}
          activeCategory={category}
        />
        <SortPopup sortBy={sortBy} />
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
          : items.map((item) => (
              <PizzaBlock key={item.id} {...item} />
            ))}
      </div>
      <Pagination onPageChanged={handleCurrentPage} currentPage={currentPage}/>
    </div>
  );
};

export default Home;
