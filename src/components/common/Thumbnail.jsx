import React from "react";

const Thumbnail = ({ image, ...rest }) => {
  return <img {...rest} src={`data:image/jpg;base64,${image}`} alt="" />;
};

export default Thumbnail;
