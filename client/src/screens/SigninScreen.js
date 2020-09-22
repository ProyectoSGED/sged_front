import React, { useContext, useState, useEffect } from "react";
import { Context as SessionContext } from "../context/SessionContext";
import SubmitMessage from "../components/SubmitMessage";

const SigninScreen = () => {
  const { state, signin, clearMessage } = useContext(SessionContext);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state.session) {
      localStorage.setItem("session", JSON.stringify(state.session));
      window.location.reload();
    }
  }, [state.session]);

  function login(e) {
    e.preventDefault();
    signin({ userName, password });
  }

  return (
    <div className="container-md screen-container">
      {state.errorMessage ? (
        <SubmitMessage errorMessage={state.errorMessage} />
      ) : null}
      <form className="signin-form" onSubmit={(e) => login(e)}>
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
        <button
          type="submit"
          className="signin-btn btn btn-primary float-right"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default SigninScreen;
