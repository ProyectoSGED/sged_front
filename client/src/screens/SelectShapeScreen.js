import React, { useState, useContext, useEffect } from "react";

import { Context as ShapesContext } from "../context/ShapesContext";

import ShapeItem from "../components/ShapeItem";
import SearchResult from "../components/SearchResult";

const SelectShapeScreen = () => {
  const { state, getShapeByQuery, getShapesCategoriesAll } = useContext(
    ShapesContext
  );

  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    getShapeByQuery(query);
  };

  useEffect(() => {
    getShapesCategoriesAll();

    if (state.shapesListByQuery && query) {
      setOpenModal(true);
    }
  }, [state.shapesListByQuery]);

  setOpenModal.bind(this);

  return (
    <div className="container-md screen-container">
      {state.shapesListByQuery && openModal ? (
        <SearchResult
          shapesList={state.shapesListByQuery}
          setOpenModal={setOpenModal}
        />
      ) : null}
      <div className="container-fluid search-form-container">
        <form className="search-form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group row">
            <div className="search-input-container col-sm-10">
              <input
                required
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                type="text"
                className="form-control"
                placeholder="Buscar capa de información..."
              />
            </div>
            <button
              className="btn"
              type="submit"
              onClick={() => getShapeByQuery(query)}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="container-md shapes-item-container">
        <div className="row row-cols-4">
          {state.shapesCategoriesAll
            ? state.shapesCategoriesAll.map((shape, index) => (
                <ShapeItem
                  key={index}
                  altText={shape.nombre_categoria}
                  imageName={shape.foto_categoria}
                  link={"/shapes/list"}
                  shapeName={shape.nombre_categoria}
                  shapeId={shape.id_categoria}
                  shapeDescription={shape.descripcion_categoria}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default SelectShapeScreen;
