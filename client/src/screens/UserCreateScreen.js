import React from "react";
import UserForm from "../components/UserForm";

const UserCreateScreen = () => {
  return (
    <div className="screen-container container-fluid">
      <h4 style={{ textAlign: "center", marginBottom: 30 }}>Nuevo usuario</h4>
      <UserForm buttonName={"Crear nuevo usuario"} isEditForm={false} />
    </div>
  );
};

export default UserCreateScreen;
