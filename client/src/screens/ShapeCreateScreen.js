import React from "react";
import ShapeForm from "../components/ShapeForm";

const ShapeCreateScreen = () => {
  return (
    <div className="screen-container container-fluid">
      <h4 style={{ textAlign: "center", marginBottom: 30 }}>Nuevo shape</h4>
      <ShapeForm buttonName={"Crear nuevo shape"} isEditForm={false} />
    </div>
  );
};

export default ShapeCreateScreen;
