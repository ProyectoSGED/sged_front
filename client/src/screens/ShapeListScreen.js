import React from "react";
import ShapesResult from "../components/ShapesResult";

const ShapeListScreen = () => {
  return (
    <div className="screen-container container-fluid">
      <h5 style={{ alignSelf: "center", textAlign: "center" }}>
        Listado de capas de información
      </h5>
      <ShapesResult />
    </div>
  );
};

export default ShapeListScreen;
