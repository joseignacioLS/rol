import React from 'react';

const P = ({ content, style = {}, className }) => {
  return (
    <p
      className={className}
      style={{
        fontSize: style.size,
        textAlign: style.align,
      }}>
      {content}
    </p>
  );
};

export default P;
