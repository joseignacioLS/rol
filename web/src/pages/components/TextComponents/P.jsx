import React from "react";

const P = ({ content, style = {}, cssClass }) => {
  return (
    <p className={cssClass} style={style}>
      {content}
    </p>
  );
};

export default P;
