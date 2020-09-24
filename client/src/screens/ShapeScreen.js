import React, { useReducer, useEffect } from "react";
import ShapesList from "../components/ShapesList";

const ShapeScreen = ({ location: { state } }) => {
  const shapeReducer = (payload, action) => {
    switch (action.type) {
      case "amenazas":
        return {
          shapeImage: "amenazas.png",
          shapeTitle: "amenazas",
          shapeCategorieId: 1,
          shapeText: `Una amenaza se puede explicar como un peligro latente que representa una amplia variedad de fenómenos (sean de origen natural o antrópico); y que puede afectar a una comunidad.\n
            Sección que contiene información sobre amenazas de origen natural o antrópico.\n 

            Las capas contenidas en esta sección, no representan en ningún caso mapas de riesgo.
            Se distinguen capas de información generadas en UBO, así como otras generadas por otros organismos. Para verificar su procedencia se debe revisar su metadata y descripción de información.`,
        };
      case "infraestructura_critica":
        return {
          shapeImage: "infraestructura_critica.png",
          shapeTitle: "infraestructura critica",
          shapeCategorieId: 2,
          shapeText: `De acuerdo a la Comisión Europea aquellas instalaciones, redes, servicios y equipos físicos y de tecnología de la información cuya interrupción o destrucción tendría un impacto mayor en la salud, la seguridad o el bienestar económico de los ciudadanos o en el eficaz funcionamiento de los gobiernos de los Estados miembros.
            Las capas contenidas en esta sección que contienen información sobre la infraestructura crítica.
            Se distinguen capas de información generadas en UBO, así como otras generadas por otros organismos. Para verificar su procedencia se debe revisar su metadata y descripción de información. 
            `,
        };
      case "datos_poblacion":
        return {
          shapeImage: "datos_poblacion.png",
          shapeTitle: "datos de población",
          shapeCategorieId: 3,
          shapeText: `Como dato de población se entiende las capas de información que contengan datos levantados en el Censo 2017 realizado por el Instituto Nacional de Estadísticas y datos generados por la Universidad Bernardo O’Higgins.
            Se distinguen capas de información generadas en UBO, así como otras generadas por otros organismos. Para verificar su procedencia se debe revisar su metadata y descripción de información. 
            `,
        };
      case "variables_fisicas_ambientales":
        return {
          shapeImage: "variables_fisicas_ambientales.png",
          shapeTitle: "variables físicas ambientales",
          shapeCategorieId: 4,
          shapeText: `Se entiende como variable ambiental a los componentes ambientales sea bióticos o abióticos, y que son parte del Medio Ambiente.
            Las capas contenidas en esta sección que contienen información sobre las distintas variables ambientales.
            Se distinguen capas de información generadas en UBO, así como otras generadas por otros organismos. Para verificar su procedencia se debe revisar su metadata y descripción de información. 
            `,
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
    <div className="container screen-container">
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
              Capa de información: {shapeItem.shapeTitle}
            </h4>
            <div className="shape-list-container">
              {shapeItem.shapeCategorieId ? (
                <ShapesList categorieId={shapeItem.shapeCategorieId} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeScreen;
