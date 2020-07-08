import React from "react";
import UsersResult from "../components/UsersResult";

const UsersListsScreen = () => {
  return (
    <div className="user-list-container container-fluid">
      <h5 style={{ alignSelf: "center", textAlign: "center" }}>
        Listado de usuarios
      </h5>
      <UsersResult />
    </div>
  );
};

export default UsersListsScreen;
