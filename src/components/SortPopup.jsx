import React, { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export const sortItems = [
  { name: "популярности (по убыванию)", type: "popular", order: "desc" },
  { name: "популярности (по возрастанию)", type: "popular", order: "asc" },
  { name: "цене (по убыванию)", type: "price", order: "desc" },
  { name: "цене (по возрастанию)", type: "price", order: "asc" },
  { name: "алфавиту (от Я до А)", type: "name", order: "desc" },
  { name: "алфавиту (от А до Я)", type: "name", order: "asc" },
];

const SortPopup = memo(
  ({ activeSortType, onClickSelectSort, activeSortOrder }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const activeLabel = sortItems.find(
      (obj) => activeSortType === obj.type && activeSortOrder === obj.order
    ).name;

    const toggleVisiblePopup = () => {
      setVisiblePopup(!visiblePopup);
    };

    const onSelectItem = (sortType) => {
      if (onClickSelectSort) {
        onClickSelectSort(sortType);
      }
      setVisiblePopup(false);
    };

    const sortRef = useRef();

    const handleOutSideClick = (e) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(sortRef.current)) {
        setVisiblePopup(false);
      }
    };

    useEffect(() => {
      document.body.addEventListener("click", handleOutSideClick);
    });

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
                    activeSortType === obj.type && activeSortOrder === obj.order
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
  }
);

SortPopup.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  onClickSelectSort: PropTypes.func.isRequired,
};

export default SortPopup;
