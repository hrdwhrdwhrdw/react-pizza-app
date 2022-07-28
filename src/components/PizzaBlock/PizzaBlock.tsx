import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, CartItemType } from "../../redux/reducers/cartSlice";
import { RootState } from "../../redux/store";

type PizzaBlockTypes = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockTypes> = ({
  id,
  name,
  price,
  imageUrl,
  types,
}) => {
  const typeNames = ["тонкое", "традиционное"];
  const sizes = [26, 30, 40];
  const cartItem = useSelector<RootState>((state) =>
    state.cart.items.find((obj) => obj.id === id)
  ) as unknown as CartItemType;
  const cartCount = cartItem ? cartItem.count : 0;
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const dispatch = useDispatch();

  const onSelectType = (index: number) => {
    setActiveType(index);
  };

  const onSelectSize = (index: number) => {
    setActiveSize(index);
  };

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      name,
      imageUrl,
      price,
      size: sizes[activeSize],
      type: typeNames[activeType],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {typeNames.map((type: string, index: number) => (
              <li
                key={type}
                onClick={() => onSelectType(index)}
                className={classNames({
                  active: activeType === index,
                  disabled: !types.includes(index),
                })}
              >
                {type}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size: number, index: number) => (
              <li
                key={size}
                onClick={() => onSelectSize(index)}
                className={classNames({
                  active: activeSize === index,
                  disabled: !sizes.includes(size),
                })}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price}₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {cartCount > 0 && <i>{cartCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
