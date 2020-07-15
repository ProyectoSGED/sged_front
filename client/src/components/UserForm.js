import React, { useContext, useEffect, useState } from "react";
import { Context as UsersAdminContext } from "../context/UsersAdminContext";

const UserForm = ({
  isEditForm,
  buttonName,
  userName,
  firstName,
  lastName,
}) => {
  const { state, getProfileList, createNewUser } = useContext(
    UsersAdminContext
  );

  const [params, setParams] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = (event, params) => {
    setShowLoading(!showLoading);

    event.preventDefault();
    if (!isEditForm) {
      createNewUser(params);
    }

    if (state.message || state.errorMessage) {
      setShowLoading(!showLoading);
      setShowMessage(!showMessage);
    }
  };

  useEffect(() => {
    getProfileList();
  }, []);

  return (
    <div className="container-md">
      {showMessage ? (
        <div
          className={`alert ${
            state.message
              ? "alert-success"
              : state.errorMessage
              ? "alert-danger"
              : null
          } alert-dismissible fade show`}
          role="alert"
        >
          {state.message
            ? state.message
            : state.errorMessage
            ? state.errorMessage
            : null}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setShowMessage(false);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      <form
        onSubmit={(e) => {
          onSubmit(e, params);
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
            defaultValue={isEditForm ? userName : ""}
            onChange={(e) => setParams({ ...params, userName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="primer_nombre">Primer nombre</label>
          <input
            type="text"
            className="form-control"
            id="primer_nombre"
            required
            defaultValue={isEditForm ? firstName : ""}
            placeholder={"Primer nombre"}
            onChange={(e) =>
              setParams({ ...params, firstName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="primer_apellido">Primer apellido</label>
          <input
            defaultValue={isEditForm ? lastName : ""}
            type="text"
            className="form-control"
            id="primer_apellido"
            required
            placeholder={"Primer apellido"}
            onChange={(e) => setParams({ ...params, lastName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id_perfil">Perfil</label>
          <select
            className="form-control"
            id="id_perfil"
            required
            onChange={(e) =>
              setParams({ ...params, profileId: e.target.value })
            }
          >
            <option>Seleccione un perfil</option>
            {state.profiles
              ? state.profiles.map((profile, index) => (
                  <option value={profile.id_perfil} key={index}>
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
              onChange={(e) =>
                setParams({ ...params, password: e.target.value })
              }
            />
          </div>
        ) : null}

        {showLoading ? (
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
