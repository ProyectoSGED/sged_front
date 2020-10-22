import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context as SessionContext } from "../context/SessionContext";
import SubmitMessage from "../components/SubmitMessage";

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { state, clearMessage, changePassword } = useContext(SessionContext);

  function updatePassword(e) {
    e.preventDefault();

    changePassword({ currentPassword, password, passwordConfirmation });
  }

  if (state.passwordUpdated) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container-md screen-container">
        <h3 style={{ textAlign: "center", marginBottom: 30 }}>
          Debe actualizar su contraseña temporal
        </h3>
        {state.errorMessage || state.message ? (
          <SubmitMessage
            errorMessage={state.errorMessage}
            successMessage={state.message}
          />
        ) : null}
        <form
          className="change-password-form"
          onSubmit={(e) => {
            updatePassword(e);
          }}
        >
          <div className="form-group form-input">
            <div className="form-group form-input">
              <label htmlFor="currentPassword">Ingrese contraseña actual</label>
              <input
                type="password"
                value={currentPassword}
                className="form-control"
                id="currentPassword"
                minLength="8"
                placeholder="********"
                required
                onChange={(e) => setCurrentPassword(e.target.value)}
                onFocus={() => clearMessage()}
              />
            </div>
            <div className="form-group form-input">
              <label htmlFor="newPassword">Ingrese nueva contraseña</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                minLength="8"
                required
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => clearMessage()}
                value={password}
              />
            </div>
            <div className="form-group form-input">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                minLength="8"
                required
                placeholder="********"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                onFocus={() => clearMessage()}
                value={passwordConfirmation}
              />
            </div>
          </div>

          <button
            type="submit"
            className="signin-btn btn btn-primary float-right"
          >
            Actualizar contraseña
          </button>
        </form>
      </div>
    );
  }
};

export default ChangePasswordScreen;
