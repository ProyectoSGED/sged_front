import React from "react";
import { Link } from "react-router-dom";

const ShapeItem = ({ imageName, altText, link, shapeName }) => {
  return (
    <div className="item-container col-md">
      <Link className="" to={{ pathname: link, state: { shapeName } }}>
        <img
          src={`${process.env.PUBLIC_URL}/images/${imageName}`}
          alt={altText}
          loading="lazy"
          height="203"
          width="237"
        />
      </Link>
      <label className="shape-name-label">{altText}</label>
    </div>
  );
};

export default ShapeItem;
