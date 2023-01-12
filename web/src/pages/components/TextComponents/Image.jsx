import React from 'react';

const Image = ({ src, style = {} }) => {
  return (
    <img
      src={src}
      style={{
        display: 'block',
        margin: style.align === 'center' ? 'auto' : '0',
        width: style.size || "200px",
      }}
    />
  );
};

export default Image;
