import React from "react";

const Button = ({
  label,
  type,
  className = "btn-primary",
  onClick,
  ...rest
}) => {
  return (
    <button
      {...rest}
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
