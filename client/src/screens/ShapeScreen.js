import React, { useReducer, useEffect } from "react";
import ShapesList from "../components/ShapesList";

const ShapeScreen = ({ location: { state } }) => {
  let shapeText;

  useEffect(() => {
    shapeText.innerHTML = state.shapeDescription;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container screen-container">
      <div className="row">
        <div className="col-md-4">
          <div className="shape-image-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/${state.imageName}`}
              width="307"
              height="312"
              alt={state.shapeName}
              loading="lazy"
            />
          </div>
          <div className="shape-text-container">
            <p className="shape-text" ref={(ref) => (shapeText = ref)}></p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="shapes-container">
            <h4 className="shape-list-title">
              Capa de información: {state.shapeName}
            </h4>
            <div className="shape-list-container">
              {state.shapeId ? (
                <ShapesList categorieId={state.shapeId} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeScreen;
