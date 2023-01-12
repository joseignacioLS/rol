import React from 'react'

const Image = ({src, style = {}}) => {
  return (
    <img
    src={src}
    style={{display: "block", ...style}}
     />
  )
}

export default Image