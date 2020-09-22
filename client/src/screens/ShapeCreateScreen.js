import React from "react";
import ShapeForm from "../components/ShapeForm";

const ShapeCreateScreen = () => {
  return (
    <div className="screen-container container-fluid">
      <h4 style={{ textAlign: "center", marginBottom: 30 }}>
        Nueva capa de información
      </h4>
      <ShapeForm buttonName={"Crear capa de información"} isEditForm={false} />
    </div>
  );
};

export default ShapeCreateScreen;
