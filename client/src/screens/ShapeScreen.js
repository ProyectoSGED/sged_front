import React, { useReducer, useEffect } from "react";

const ShapeScreen = ({ location: { state } }) => {
  const shapeReducer = (payload, action) => {
    switch (action.type) {
      case "amenazas":
        return {
          shapeImage: "amenazas.png",
          shapeTitle: "amenazas",
          shapeText:
            "Los desastres, entendidos en un sentido amplio como procesos o eventos con resultados o efectos de connotación negativa que, sobre cierto umbral económico-social y/o de percepción, afectan parte o la totalidad del medio ambiente natural o del construido y su funcionalidad",
        };
      case "infraestructura_critica":
        return {
          shapeImage: "infraestructura_critica.png",
          shapeTitle: "infraestructura critica",
          shapeText:
            "Una infraestructura crítica son las infraestructuras estratégicas que proporcionan servicios esenciales y cuyo funcionamiento es indispensable. De esta manera, su perturbación o destrucción tendría un grave impacto sobre los servicios esenciales.",
        };
      case "datos_poblacion":
        return {
          shapeImage: "datos_poblacion.png",
          shapeTitle: "datos de población",
          shapeText:
            "Datos de poblacion es definido como un conjunto de personas que habitan una determinada área geográfica. Estadisticamente, el término “población” se refiere al conjunto de elementos que se quiere investigar, estos elementos pueden ser objetos, acontecimientos, situaciones o grupo de personas.",
        };
      case "variables_fisicas_ambientales":
        return {
          shapeImage: "variables_fisicas_ambientales.png",
          shapeTitle: "variables físicas ambientales",
          shapeText:
            "Las variables ambientales han sido agrupadas en áreas temáticas como: hidrología, calidad del agua, suelos, geodinámica, biota y aspectos socioeconómicos. El propósito de la evaluación ambiental es determinar los efectos  de las actividades sobre dichas variables y que fectos pueden transmitirse entre ellas por medio de sus interacciones.",
        };
      default:
        return payload;
    }
  };

  const [shapeItem, action] = useReducer(shapeReducer, {});

  useEffect(() => {
    action({ type: state.shapeName });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container shape-list-container">
      <div className="row">
        <div className="col-md-4">
          <div className="shape-image-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/${shapeItem.shapeImage}`}
              width="307"
              height="312"
              alt={state.shapeName}
              loading="lazy"
            />
          </div>
          <div className="shape-text-container">
            <p className="shape-text">{shapeItem.shapeText}</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="shapes-container">
            <h4 className="shape-list-title">
              listado de shapes: {shapeItem.shapeTitle}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeScreen;
