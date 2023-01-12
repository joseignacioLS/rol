import React from 'react';

const Span = ({ clickF = () => {}, className, content }) => {
  return (
    <span onClick={clickF} className={className}>
      {content}
    </span>
  );
};

export default Span;
