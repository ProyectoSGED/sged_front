import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

const HomeScreen = () => {
  return (
    <div className="homeContainer container-fluid">
      <Carousel />
      <div className="row">
        <div className="col">
          <div className="descriptionContainer container">
            <p className="descriptionTitle text-center">
              INFRAESTRUCTURA DE DATOS ESPACIALES UBO
            </p>
            <p className="descriptionText">
              IDE UBO es una plataforma on line que pone a disposición capas de
              información geoespacial creada por trabajos de investigación
              desarrollados en la Escuela Ciencias de la Tierra y el
              Observatorio en Gestión de Riesgo de Desastres de la Facultad de
              Ingeniería, Ciencia y Tecnología procedentes de las áreas del
              Riesgo de Desastres, Ordenamiento Territorial, Medio Ambiente y
              Geodesia. Es plataforma busca ser un medio para difundir
              conocimiento, visualizar y analizar la información geoespacial,
              aportando al desarrollo de políticas públicas y la toma de
              decisiones. La información publicada en este sitio es de carácter
              público y se encuentra en permanente actualización. Toda
              información contenida en mapas que se relacionan con los límites y
              fronteras de Chile, no compromete en modo alguno al Estado de
              Chile de acuerdo al Art. 2º letra g de DFL Nº83 de 1979, del
              Ministerio de Relaciones Exteriores.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="mapContainer container">
            <p className="mapTitle text-center">
              SISTEMA DE INFORMACIÓN TERRITORIAL
            </p>
            <div className="buttons-container">
              <Link to="#" className="access-button">
                Ingresar como visita
              </Link>
              <Link to="/signin" className="access-button">
                Ingresar con cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
