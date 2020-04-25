import React from "react";

const Avatar = ({ preview, image, className }) => {
  return (
    <img
      className={className}
      src={preview ? preview : `data:image/jpg;base64,${image}`}
    />
  );
};

export default Avatar;
