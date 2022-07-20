import React from "react";
import classNames from "classnames";

const Button = ({ onClick, outline, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames("button", { "button--outline": outline }, className)}
    >
      {children}
    </button>
  );
};

export default Button;
