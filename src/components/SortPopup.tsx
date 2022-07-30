import React, { memo, useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { SortNameType, SortType, OrderType, SortByType } from '../redux/filter/types';
import { setSortBy } from "../redux/filter/filterSlice";
import { useAppDispatch } from '../hooks/useAppDispatch';

export const sortItems: SortByType[] = [
  {
    name: SortNameType.POPULAR_DESC,
    type: SortType.POPULAR,
    order: OrderType.DESC,
  },
  {
    name: SortNameType.POPULAR_ASC,
    type: SortType.POPULAR,
    order: OrderType.ASC,
  },
  {
    name: SortNameType.PRICE_DESC,
    type: SortType.PRICE,
    order: OrderType.DESC,
  },
  { name: SortNameType.PRICE_ASC, type: SortType.PRICE, order: OrderType.ASC },
  {
    name: SortNameType.ALPHABET_DESC,
    type: SortType.NAME,
    order: OrderType.DESC,
  },
  {
    name: SortNameType.ALPHABET_ASC,
    type: SortType.NAME,
    order: OrderType.ASC,
  },
];

type SortPopupType = {
  sortBy: SortByType;
};

const SortPopup: React.FC<SortPopupType> = memo(({ sortBy }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);

  const dispatch = useAppDispatch();

  const activeLabel = sortItems.find(
    (obj) => sortBy.type === obj.type && sortBy.order === obj.order
  )?.name;

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const onSelectItem = useCallback((sortType: SortByType) => {
    dispatch(setSortBy(sortType));
    setVisiblePopup(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setVisiblePopup(false);
      }
    };
    document.body.addEventListener("click", handleOutSideClick);
    return () => document.body.removeEventListener("click", handleOutSideClick);
  },[]);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={!visiblePopup ? "rotate" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => toggleVisiblePopup()}>{activeLabel}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortItems.map((obj, index) => (
              <li
                className={
                  sortBy.type === obj.type && sortBy.order === obj.order
                    ? "active"
                    : ""
                }
                onClick={() => onSelectItem(obj)}
                key={`${obj.type}_${index}`}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
