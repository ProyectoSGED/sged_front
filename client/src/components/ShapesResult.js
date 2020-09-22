import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Context as ShapesContext } from "../context/ShapesContext";
import AlertDialog from "./AlertDialog";
import SubmitMessage from "./SubmitMessage";

const ShapesResult = () => {
  const { state, clearMessage, getAllShapes, deleteShape } = useContext(
    ShapesContext
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [shapeId, setShapeId] = useState(null);

  const { profile } = localStorage.getItem("session")
    ? JSON.parse(localStorage.getItem("session"))
    : "";

  function deleteShapeById(shapeId) {
    setShapeId(shapeId);
    setOpenDialog(true);
  }

  function handleDeleteShape() {
    deleteShape(shapeId);
  }

  const columns = [
    {
      name: "Nombre capa información",
      selector: "nombre_shape",
      sortable: true,
      wrap: true,
    },
    { name: "Autor", selector: "autor" },
    {
      name: "Fecha publicación",
      selector: "fecha_publicacion",
      sortable: true,
    },
    { name: "Categoria", selector: "nombre_categoria", sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="actions-container">
          {profile === "ADMINISTRADOR" ? (
            <div onClick={() => deleteShapeById(row.id_shape)}>
              <i
                className="action-icon fas fa-trash-alt"
                style={{ color: "red" }}
              ></i>
            </div>
          ) : null}

          <div>
            <Link to={{ pathname: "/admin/shape/update", state: row.id_shape }}>
              <i
                className="action-icon fas fa-edit"
                style={{ color: "blue" }}
              ></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  function handleMessage() {
    clearMessage();
  }

  useEffect(() => {
    getAllShapes();
  }, [state.message]);

  return state.shapesList ? (
    <div>
      {state.message || state.errorMessage ? (
        <SubmitMessage
          errorMessage={state.errorMessage}
          successMessage={state.message}
          handleMessage={handleMessage}
        />
      ) : null}
      {openDialog ? (
        <AlertDialog
          openDialog={setOpenDialog}
          message={
            "La capa de información sera eliminada y no podra ser accedida"
          }
          title={"¿Desea eliminar la capa de información seleccionada?"}
          shapeId={shapeId}
          onAccept={handleDeleteShape}
        />
      ) : null}
      <DataTable
        columns={columns}
        data={state.shapesList}
        pagination={true}
        paginationPerPage={10}
        striped
        noDataComponent={"No existen registros para mostrar..."}
        paginationComponentOptions={{
          rowsPerPageText: "Capas de información por página: ",
        }}
      />
    </div>
  ) : null;
};

export default ShapesResult;
