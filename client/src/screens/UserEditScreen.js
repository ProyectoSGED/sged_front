import React from "react";
import UserForm from "../components/UserForm";

const UserEditScreen = ({ location }) => {
  return (
    <div className="screen-container container-fluid">
      <h4 style={{ textAlign: "center", marginBottom: 30 }}>
        Editar información de usuario
      </h4>
      <UserForm
        buttonName={"Editar usuario"}
        isEditForm={true}
        userId={location.state}
      />
    </div>
  );
};

export default UserEditScreen;
