import React from "react";
import { Link } from "react-router-dom";

const MapPolicyScreen = () => {
  return (
    <div className="container-md screen-container">
      <div className="policy-container">
        <h2>POLÍTICA DE USO GEOPORTAL UBO</h2>
        <p className="policy-text">
          POLÍTICA DE USO GEOPORTAL UBO IDE UBO es una plataforma online que
          pone a disposición capas de información geoespacial creada por
          trabajos de investigación desarrollados en la Escuela Ciencias de la
          Tierra y el Observatorio en Gestión de Riesgo de Desastres de la
          Facultad de Ingeniería, Ciencia y Tecnología procedentes de las áreas
          del Riesgo de Desastres, Ordenamiento Territorial, Medio Ambiente y
          Geodesia.
        </p>
        <p className="policy-text">
          Esta plataforma busca ser un medio para difundir conocimiento,
          visualizar y analizar la información geoespacial, aportando al
          desarrollo de políticas públicas y la toma de decisiones.
        </p>
        <p className="policy-text">
          {" "}
          Toda la información que se encuentre contenida en este sitio web y que
          es desarrollada por UBO, se encuentra disponible para uso académico,
          investigación u otro. Su uso implica la autoría por lo que debe
          respetarse el derecho de autor. La información contenida de otras
          instituciones es referencial y se encuentra en constante actualización
          por parte de las instituciones responsables.
        </p>
        <p className="policy-text">
          La carga de información en el Geoportal UBO es un proceso de carácter
          permanente, por lo cual no toda la información territorial que se
          produce en UBO podría estar actualmente contenida en esta herramienta.
        </p>
        <p className="policy-text">
          Las capas de información contenidas en el Geoportal UBO, se han
          trabajado por en el datum WGS 1984. Ante cualquier duda, es facultad
          del usuario verificar suexactitud y vigencia.
        </p>
        <p className="policy-text">
          La Universidad Bernardo O’Higgins no se hace responsable de los
          resultados, decisiones y/o acciones que puedan derivar del uso de esta
          información, ya sea producto de la visualización de una capa
          individualmente o de la integración y/o procesamiento de éstas.{" "}
        </p>
        <p className="policy-text">
          Los mapas publicados en este visor, que se refieren o se relacionan
          con los límites y fronteras de Chile, no comprometen en modo alguno al
          Estado de Chile, de acuerdo al Artículo 2°, letra g del DFL N°83 de
          1979, del Ministerio de Relaciones Exteriores.
        </p>

        <p className="policy-text">
          Si selecciona la opción “aceptar” ingresará directamente al Geoportal
          UBO. A través de la opción “cancelar” volverá a la página de inicio de
          la IDE UBO (www.ide.ubo.cl).
        </p>
        <div className="policy-buttons-container">
          <Link to="/" className="access-button policy-button">
            Cancelar
          </Link>

          <Link to="/map" className="access-button policy-button">
            Aceptar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapPolicyScreen;
