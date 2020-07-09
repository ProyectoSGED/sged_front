import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Context as UsersAdminContext } from "../context/UsersAdminContext";
import AlertDialog from "./AlertDialog";

const UsersResult = () => {
  const { state, getUsersList, deactivateUser } = useContext(UsersAdminContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [userId, setUserId] = useState(null);

  function deactivateUserById(userId) {
    setUserId(userId);
    setOpenDialog(true);
  }

  const columns = [
    { name: "Nombre usuario", selector: "nombre_usuario" },
    { name: "Primer nombre", selector: "primer_nombre" },
    { name: "Primer apellido", selector: "primer_apellido" },
    { name: "Perfil", selector: "nombre_perfil" },
    {
      name: "Activo",
      cell: (row) => (
        <div>
          {row.usuario_activo ? (
            <i
              className="status-icon fas fa-check"
              style={{ color: "green" }}
            ></i>
          ) : (
            <i className="status-icon fas fa-ban" style={{ color: "red" }}></i>
          )}
        </div>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="actions-container">
          <div onClick={() => deactivateUserById(row.id_usuario)}>
            <i
              className="action-icon fas fa-trash-alt"
              style={{ color: "red" }}
            ></i>
          </div>
          <div>
            <i
              className="action-icon fas fa-edit"
              style={{ color: "blue" }}
            ></i>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUsersList();
  }, []);

  function handleDeactivateUser() {
    deactivateUser(userId);

    window.location.reload();
  }
  console.log(state);
  return state.userList ? (
    <div>
      {openDialog ? (
        <AlertDialog
          openDialog={setOpenDialog}
          message={
            "El usuario sera desactivado del sistema y no podra acceder a este"
          }
          title={"¿Desea desactivar al usuario seleccionado?"}
          userId={userId}
          onAccept={handleDeactivateUser}
        />
      ) : null}
      <DataTable
        columns={columns}
        data={state.userList}
        pagination={true}
        paginationPerPage={10}
        striped
      />
    </div>
  ) : null;
};

export default UsersResult;
