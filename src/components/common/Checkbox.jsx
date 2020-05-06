import React from "react";

const Checkbox = ({
  name,
  label,
  type = "checkbox",
  onChange,
  placeholder,
  className = "custom-control-input",
  ...rest
}) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        {...rest}
        type={type}
        className={className}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label className="custom-control-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
