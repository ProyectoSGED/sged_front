import React from "react";
import ShapeForm from "../components/ShapeForm";

const ShapeUpdateScreen = ({ location }) => {
  return (
    <div className="screen-container container-fluid">
      <h4 style={{ textAlign: "center", marginBottom: 30 }}>Editar shape</h4>
      <ShapeForm
        isEditForm={true}
        idShape={location.state}
        buttonName={"Editar Shape"}
      />
    </div>
  );
};

export default ShapeUpdateScreen;
