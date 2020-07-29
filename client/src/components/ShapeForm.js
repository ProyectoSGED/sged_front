import React from "react";

const ShapeForm = () => {
  return (
    <div className="container-md">
      <form>
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
    
        <label htmlFor="shapeCategorie">Categoria del shape</label>
        <select id="shapeCategorie" className="form-control" required>
          <option value="">Seleccione categoría de shape</option>
        </select>
        <label htmlFor="shapeResume">Resumen de shape</label>
        <textarea
          id="shapeResume"
          className="form-control"
          placeholder={"Ingrese un resumen del contenido del shape..."}
          rows="3"
          required
        ></textarea>
      </form>
    </div>
  );
};

export default ShapeForm;
