import React from "react";
import ShapeItem from "../components/ShapeItem";

const SelectShapeScreen = () => {
  return (
    <div className="container-md download-container">
      <div className="container-fluid search-form-container">
        <form className="search-form">
          <div className="form-group row">
            <div className="search-input-container col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="buscar..."
              />
            </div>
            <button className="btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="container-md shapes-item-container">
        <div className="row row-cols-4">
          <ShapeItem
            altText={"amenazas"}
            imageName={"amenazas.png"}
            link={"/shapes/list"}
            shapeName={"amenazas"}
          />
          <ShapeItem
            altText={"infraestructura critica"}
            imageName={"infraestructura_critica.png"}
            link={"/shapes/list"}
            shapeName={"infraestructura_critica"}
          />
          <ShapeItem
            altText={"datos poblacion"}
            imageName={"datos_poblacion.png"}
            link={"/shapes/list"}
            shapeName={"datos_poblacion"}
          />
          <ShapeItem
            altText={"variables fisicas ambientales"}
            imageName={"variables_fisicas_ambientales.png"}
            link={"/shapes/list"}
            shapeName={"variables_fisicas_ambientales"}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectShapeScreen;
