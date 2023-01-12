import React from 'react';

const Li = ({ content,  style = {} }) => {
  return <li style={{
    fontSize: style.size
  }}>{content}</li>
};

export default Li;
