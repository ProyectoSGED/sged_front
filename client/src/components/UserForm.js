import React, { useContext, useEffect, useState } from "react";
import { Context as UsersAdminContext } from "../context/UsersAdminContext";
import SubmitMessage from "./SubmitMessage";

const UserForm = ({ isEditForm, buttonName, userId }) => {
  const {
    state,
    getProfileList,
    createNewUser,
    getUserById,
    clearMessage,
    editUser,
  } = useContext(UsersAdminContext);

  const [showLoading, setShowLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const params = {
      userId: userId ? userId : null,
      userName: event.target.nombre_usuario.value,
      firstName: event.target.primer_nombre.value,
      lastName: event.target.primer_apellido.value,
      profileId: event.target.id_perfil.value,
      userEmail: event.target.userEmail.value,
      password: event.target.password ? event.target.password.value : null,
      userActive: event.target.checkUserActive
        ? event.target.checkUserActive.checked
        : null,
    };

    setShowLoading(!showLoading);

    if (!isEditForm) {
      event.target.reset();
      createNewUser(params);
    } else {
      editUser(params);
    }
  };

  useEffect(() => {
    if (isEditForm) {
      getUserById(userId);
    }
    getProfileList();
  }, [state.message, state.errorMessage]);

  return (
    <div className="container-md">
      {state.message || state.errorMessage ? (
        <SubmitMessage
          errorMessage={state.errorMessage}
          successMessage={state.message}
        />
      ) : null}
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="nombre_usuario">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="nombre_usuario"
            required
            placeholder={"Nombre de usuario"}
            defaultValue={
              isEditForm && state.user ? state.user[0].nombre_usuario : ""
            }
            onFocus={() => clearMessage()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="primer_nombre">Primer nombre</label>
          <input
            type="text"
            className="form-control"
            id="primer_nombre"
            required
            defaultValue={
              isEditForm && state.user ? state.user[0].primer_nombre : ""
            }
            placeholder={"Primer nombre"}
            onFocus={() => clearMessage()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="primer_apellido">Primer apellido</label>
          <input
            defaultValue={
              isEditForm && state.user ? state.user[0].primer_apellido : ""
            }
            type="text"
            className="form-control"
            id="primer_apellido"
            required
            placeholder={"Primer apellido"}
            onFocus={() => clearMessage()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Email</label>
          <input
            defaultValue={
              isEditForm && state.user ? state.user[0].mail_usuario : ""
            }
            type="email"
            className="form-control"
            id="userEmail"
            required
            placeholder={"mail@mail.com"}
            onFocus={() => clearMessage()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id_perfil">Perfil</label>
          <select
            className="form-control"
            id="id_perfil"
            required
            onFocus={() => clearMessage()}
          >
            <option value="">Seleccione un perfil</option>
            {state.profiles
              ? state.profiles.map((profile, index) => (
                  <option
                    value={profile.id_perfil}
                    key={index}
                    selected={
                      isEditForm &&
                      state.user &&
                      profile.id_perfil === state.user[0].id_perfil
                        ? true
                        : false
                    }
                  >
                    {profile.nombre_perfil}
                  </option>
                ))
              : null}
          </select>
        </div>
        {!isEditForm ? (
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              minLength="8"
              placeholder={"Contraseña"}
              onFocus={() => clearMessage()}
            />
          </div>
        ) : (
          <div className="form-group form-check">
            <input
              defaultChecked={state.user ? state.user[0].usuario_activo : null}
              type="checkbox"
              className="form-check-input"
              id="checkUserActive"
              onFocus={() => clearMessage()}
            />
            <label className="form-check-label" htmlFor="checkUserActive">
              Activar/Desactivar usuario
            </label>
          </div>
        )}

        {showLoading && !state.hideLoading ? (
          <div
            className="float-right spinner-border text-primary"
            role="status"
          >
            <span className="sr-only">Loading...</span>
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

export default UserForm;
