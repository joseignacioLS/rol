import React from 'react';

const H = ({ content, level, style = {} }) => {
  switch (level) {
    case 2:
      return <h2 style={style}>{content}</h2>;
    case 3:
      return <h3 style={style}>{content}</h3>;
    case 4:
      return <h4 style={style}>{content}</h4>;
    default:
      return <h2 style={style}>{content}</h2>;
  }
};

export default H;
