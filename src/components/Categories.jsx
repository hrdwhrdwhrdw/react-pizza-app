import React, { memo } from "react";
import PropTypes from "prop-types";

const Categories = memo(({ activeCategory, onClickCategory }) => {
  const categories = [
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={() => onClickCategory(null)}
        >
          Все
        </li>
        {categories.map((item, index) => (
          <li
            className={index === activeCategory ? "active" : ""}
            onClick={() => onClickCategory(index)}
            key={`${item}_${index}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  onClickCategory: PropTypes.func,
};

export default Categories;
