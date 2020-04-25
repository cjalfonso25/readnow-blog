import React from "react";

const Textarea = ({ name, label, rows, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        className="form-control"
        id={name}
        name={name}
        rows={rows}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default Textarea;
