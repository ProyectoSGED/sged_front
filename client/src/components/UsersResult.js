import React, { useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Context as UsersAdminContext } from "../context/UsersAdminContext";

const UsersResult = () => {
  const { state, getUsersList } = useContext(UsersAdminContext);

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
          <div>
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

  return state.userList ? (
    <DataTable
      columns={columns}
      data={state.userList}
      pagination={true}
      paginationPerPage={10}
      striped
    />
  ) : null;
};

export default UsersResult;
