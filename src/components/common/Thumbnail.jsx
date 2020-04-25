import React from "react";

const Thumbnail = ({ image, ...rest }) => {
  console.log("THUMBNAIL", image);

  return <img {...rest} src={`data:image/jpg;base64,${image}`} alt="" />;
};

export default Thumbnail;
