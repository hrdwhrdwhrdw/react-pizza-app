import React, { useState } from "react";

const Categories = ({ items }) => {
  const [activeItem, setActiveItem] = useState(null);
  return (
    <div className="categories">
      <ul>
        <li
          className={activeItem === null ? "active" : ""}
          onClick={() => setActiveItem(null)}
        >
          Все
        </li>
        {items.map((item, index) => (
          <li
            className={index === activeItem ? "active" : ""}
            onClick={() => setActiveItem(index)}
            key={`${item}_${index}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
