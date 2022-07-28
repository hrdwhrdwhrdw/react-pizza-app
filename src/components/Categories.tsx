import React, { memo } from "react";

export type CategoriesProps = {
  activeCategory: number;
  onClickCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(
  ({ activeCategory, onClickCategory }) => {
    const categories: string[] = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
    ];

    return (
      <div className="categories">
        <ul>
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
  }
);

export default Categories;
