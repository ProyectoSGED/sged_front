import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context as ShapesContext } from "../context/ShapesContext";

const ShapeItem = ({
  imageName,
  altText,
  link,
  shapeName,
  shapeId,
  shapeDescription,
}) => {
  const { state, clearShape } = useContext(ShapesContext);

  return (
    <div className="item-container col-md">
      <Link
        onClick={clearShape}
        className=""
        to={{
          pathname: link,
          state: { shapeId, shapeName, shapeDescription, imageName },
        }}
      >
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
