import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Context as SessionContext } from "../context/SessionContext";
import SubmitMessage from "../components/SubmitMessage";

const SigninScreen = () => {
  const {
    state,
    signin,
    clearMessage,
    resetPassword,
    verifyChangeUserPassword,
  } = useContext(SessionContext);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (state.session) {
      localStorage.setItem("session", JSON.stringify(state.session));
      verifyChangeUserPassword();
    }

    if (state.showSignInSession) {
      setShowEmail(false);
    }
  }, [
    state.session,
    state.showSignInSession,
    state.changeUserPassword,
    state.redirectToHome,
  ]);

  function login(e) {
    e.preventDefault();
    signin({ userName, password });
  }

  function sendEmailResetPassword(e) {
    e.preventDefault();
    resetPassword(userEmail);
  }

  if (state.session && state.changeUserPassword) {
    return <Redirect to="/change-password" />;
  } else if (state.session && state.redirectToHome) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container-md screen-container">
        {state.session && (state.errorMessage || state.message) ? (
          <SubmitMessage
            errorMessage={state.errorMessage}
            successMessage={state.message}
          />
        ) : null}
        <form
          className="signin-form"
          onSubmit={(e) => (showEmail ? sendEmailResetPassword(e) : login(e))}
        >
          {showEmail ? (
            <div className="form-group form-input">
              <label htmlFor="userEmail">Ingrese email de usuario</label>
              <input
                type="email"
                value={userEmail}
                className="form-control"
                id="userEmail"
                placeholder="mail@mail.com"
                required
                onChange={(e) => setUserEmail(e.target.value)}
                onFocus={() => clearMessage()}
              />
            </div>
          ) : (
            <div className="form-group form-input">
              <div className="form-group form-input">
                <label htmlFor="userName">Ingrese su nombre de usuario</label>
                <input
                  type="text"
                  value={userName}
                  className="form-control"
                  id="userName"
                  placeholder="nombre de usuario"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => clearMessage()}
                />
              </div>
              <div className="form-group form-input">
                <label htmlFor="userPassword">Ingrese su contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="userPassword"
                  minLength="8"
                  required
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => clearMessage()}
                  value={password}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="signin-btn btn btn-primary float-right"
          >
            {showEmail ? "Solicitar nueva contraseña" : "Ingresar"}
          </button>
          {showEmail ? (
            <button
              onClick={() => setShowEmail(false)}
              type="submit"
              className="cancel-btn btn btn-danger float-right"
            >
              Cancelar
            </button>
          ) : null}
          {!showEmail ? (
            <Link
              to="#"
              onClick={() => setShowEmail(true)}
              style={{ marginTop: 10 }}
            >
              ¿Olvidó su contraseña?
            </Link>
          ) : null}
        </form>
      </div>
    );
  }
};

export default SigninScreen;
