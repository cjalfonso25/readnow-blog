import React from "react";

const FileInput = ({
  label,
  name,
  className = "custom-file-input",
  divClass = "custom-file",
  onChange,
  ...rest
}) => {
  return (
    <div className={divClass}>
      <input
        {...rest}
        type="file"
        className={className}
        id={name}
        name={name}
        onChange={onChange}
      />
      <label className="custom-file-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default FileInput;
