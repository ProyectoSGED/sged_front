import React, { useContext, useEffect, useState } from "react";
import { Context as ShapeAdminContext } from "../context/ShapesContext";
import SubmitMessage from "./SubmitMessage";

const ShapeForm = ({ isEditForm, idShape, buttonName }) => {
  const {
    state,
    getShapesCategories,
    createNewShape,
    clearMessage,
    getShapeById,
    updateShape,
  } = useContext(ShapeAdminContext);

  const [showLoading, setShowLoading] = useState(false);
  const [updateShapeFile, setUpdateShapeFile] = useState(false);

  useEffect(() => {
    getShapesCategories();

    if (isEditForm) {
      getShapeById(idShape);
    }

    return () => {
      clearMessage();
    };
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const params = {
      id_shape: idShape,
      nombre_shape: e.target.shapeName.value,
      resumen_shape: e.target.shapeResume.value,
      autor_shape: e.target.shapeAutor.value,
      formato_capa_informacion: e.target.shapeFormat.value,
      id_categoria: e.target.shapeCategory.value,
      nombre_categoria:
        e.target.shapeCategory.options[e.target.shapeCategory.selectedIndex]
          .text,
      update_shape_file: updateShapeFile ? 1 : 0,
    };

    if (isEditForm && updateShapeFile) {
      params.shape_file = e.target.loadShapeFile.files[0];
    } else if (!isEditForm) {
      params.shape_file = e.target.loadShapeFile.files[0];
    }

    setShowLoading(true);

    if (isEditForm) {
      updateShape(params);
    } else {
      createNewShape(params);
    }
  }

  if (state.message) {
    document.getElementById("shape-form").reset();
  }

  return (
    <div className="container-md">
      {state.message || state.errorMessage ? (
        <SubmitMessage
          successMessage={state.message}
          errorMessage={state.errorMessage}
        />
      ) : null}

      <form
        id="shape-form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="shapeName">Nombre capa de información</label>
          <input
            type="text"
            id="shapeName"
            defaultValue={
              isEditForm && state.shape ? state.shape[0].nombre_shape : ""
            }
            className="form-control"
            required
            placeholder={"Ingrese nombre de shape..."}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shapeAutor">Autor capa de información</label>
          <input
            defaultValue={isEditForm && state.shape ? state.shape[0].autor : ""}
            type="text"
            id="shapeAutor"
            className="form-control"
            required
            placeholder={"Ingrese el autor del shape..."}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shapeFormat">Formato capa de información</label>
          <select
            id="shapeFormat"
            className="form-control"
            required
            value={
              isEditForm && state.shape
                ? state.shape[0].formato_capa_informacion
                : ""
            }
          >
            <option value="">
              Seleccione formato para capa de información
            </option>
            <option value="shape">Shape</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="shapeCategory">Categoria capa de información</label>
          <select id="shapeCategory" className="form-control" required>
            <option value="">
              Seleccione categoría para capa de información
            </option>
            {state.shapesCategories
              ? state.shapesCategories.map((category, index) => (
                  <option
                    value={category.id_categoria}
                    key={index}
                    selected={
                      isEditForm &&
                      state.shape &&
                      category.id_categoria == state.shape[0].id_categoria
                        ? true
                        : false
                    }
                  >
                    {category.nombre_categoria}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="shapeResume">Resumen capa de información</label>
          <textarea
            defaultValue={
              isEditForm && state.shape ? state.shape[0].resumen_shape : ""
            }
            id="shapeResume"
            className="form-control"
            placeholder={"Ingrese un resumen del contenido del shape..."}
            rows="3"
            required
          ></textarea>
        </div>
        {isEditForm ? (
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="addShape"
              value={updateShapeFile}
              onChange={(e) => setUpdateShapeFile(e.target.checked)}
            />
            <label className="form-chek-label" htmlFor="addShape">
              ¿Modificar archivo para capa de información?
            </label>
          </div>
        ) : null}

        {isEditForm && updateShapeFile ? (
          <div className="form-group">
            <label htmlFor="loadShapeFile">
              Añadir archivo para capa de información
            </label>
            <input
              required
              type="file"
              className="form-control-file"
              id="loadShapeFile"
              accept=".zip"
              multiple={false}
            />
          </div>
        ) : null}

        {!isEditForm ? (
          <div className="form-group">
            <label htmlFor="loadShapeFile">
              Añadir archivo para capa de información
            </label>
            <input
              required
              type="file"
              className="form-control-file"
              id="loadShapeFile"
              accept=".zip"
              multiple={false}
            />
          </div>
        ) : null}

        {showLoading && !state.hideLoading ? (
          <div className="loading-container">
            {isEditForm && updateShapeFile ? (
              <h5 style={{ marginRight: 20, marginTop: 5 }}>
                Cargando... {state.uploadProgress}%
              </h5>
            ) : null}

            {!isEditForm ? (
              <h5 style={{ marginRight: 20, marginTop: 5 }}>
                Cargando... {state.uploadProgress}%
              </h5>
            ) : null}
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
            {buttonName}
          </button>
        )}
      </form>
    </div>
  );
};

export default ShapeForm;
