import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Context as UsersAdminContext } from "../context/UsersAdminContext";
import AlertDialog from "./AlertDialog";
import SubmitMessage from "./SubmitMessage";

const UsersResult = () => {
  const { state, getUsersList, deactivateUser, clearMessage } = useContext(
    UsersAdminContext
  );
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
    { name: "Email", selector: "mail_usuario" },
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
            <Link
              to={{ pathname: "/admin/users/update", state: row.id_usuario }}
            >
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
    getUsersList();
  }, [state.message]);

  function handleDeactivateUser() {
    deactivateUser(userId);
  }

  return state.userList ? (
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
        paginationComponentOptions={{
          rowsPerPageText: "Usuarios por página: ",
        }}
      />
    </div>
  ) : null;
};

export default UsersResult;
