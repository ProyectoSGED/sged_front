import React, { useContext, useEffect, useState } from "react";
import { Context as ShapeAdminContext } from "../context/ShapesContext";
import SubmitMessage from "./SubmitMessage";

const ShapeForm = () => {
  const { state, getShapesCategories, createNewShape, clearShape } = useContext(
    ShapeAdminContext
  );
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    getShapesCategories();

    return () => {
      clearShape();
    };
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const params = {
      nombre_shape: e.target.shapeName.value,
      resumen_shape: e.target.shapeResume.value,
      autor_shape: e.target.shapeAutor.value,
      shape_fecha_metadato: e.target.shapeDateMetadata.value,
      id_categoria: e.target.shapeCategorie.value,
      shape_file: e.target.loadShapeFile.files[0],
      nombre_categoria:
        e.target.shapeCategorie.options[e.target.shapeCategorie.selectedIndex]
          .text,
    };

    setShowLoading(true);

    e.target.reset();
    createNewShape(params);
  }

  console.log(state);
  console.log(showLoading);

  return (
    <div className="container-md">
      {state.message || state.errorMessage ? (
        <SubmitMessage
          errorMessage={state.errorMessage}
          successMessage={state.message}
        />
      ) : null}
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="shapeName">Nombre de shape</label>
          <input
            type="text"
            id="shapeName"
            className="form-control"
            required
            placeholder={"Ingrese nombre de shape..."}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shapeAutor">Autor de shape</label>
          <input
            type="text"
            id="shapeAutor"
            className="form-control"
            required
            placeholder={"Ingrese el autor del shape..."}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shapeDateMetadata">Fecha creación del metadato</label>
          <input
            id="shapeDateMetadata"
            className="form-control"
            type="date"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="shapeCategorie">Categoria del shape</label>
          <select id="shapeCategorie" className="form-control" required>
            <option value="">Seleccione categoría de shape</option>
            {state.shapesCategories
              ? state.shapesCategories.map((categorie, index) => (
                  <option value={categorie.id_categoria} key={index}>
                    {categorie.nombre_categoria}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="shapeResume">Resumen de shape</label>
          <textarea
            id="shapeResume"
            className="form-control"
            placeholder={"Ingrese un resumen del contenido del shape..."}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="loadShapeFile">Añadir archivo shape</label>
          <input
            required
            type="file"
            className="form-control-file"
            id="loadShapeFile"
            accept=".zip"
            multiple={false}
          />
        </div>
        {showLoading && !state.hideLoading ? (
          <div className="loading-container">
            <h5 style={{ marginRight: 20, marginTop: 5 }}>
              Cargando... {state.uploadProgress}%
            </h5>
            <div
              className="float-right spinner-border text-primary"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="signin-btn btn btn-primary float-right"
          >
            Crear nuevo shape
            {/*buttonName*/}
          </button>
        )}
      </form>
    </div>
  );
};

export default ShapeForm;
