import React from "react";
import ShapeItem from "../components/ShapeItem";
import { Link } from "react-router-dom";

const DonwloadScreen = () => {
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
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="container-md shapes-item-container">
        <div className="row row-cols-4">
          <ShapeItem
            altText={"amenazas"}
            imageName={"amenazas.png"}
            link={"#"}
          />
          <ShapeItem
            altText={"infraestructura critica"}
            imageName={"infraestructura_critica.png"}
            link={"#"}
          />
          <ShapeItem
            altText={"datos poblacion"}
            imageName={"datos_poblacion.png"}
            link={"#"}
          />
          <ShapeItem
            altText={"variables fisicas ambientales"}
            imageName={"variables_fisicas_ambientales.png"}
            link={"#"}
          />
        </div>
      </div>
    </div>
  );
};

export default DonwloadScreen;
