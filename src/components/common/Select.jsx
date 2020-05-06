import React from "react";

const Select = ({
  label,
  name,
  options,
  divClass = "form-group",
  className = "form-control",
  defaultValue = "Choose...",
  ...rest
}) => {
  return (
    <div className={divClass}>
      <label htmlFor={name}>{label}</label>
      <select {...rest} className={className} id={name}>
        <option defaultValue>{defaultValue}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
