import React from "react";

const SigninScreen = () => {
  return (
    <div className="container-md signin-container">
      <form className="signin-form">
        <div className="form-group">
          <label htmlFor="userName">Ingrese su nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            placeholder="nombre de usuario"
            required
          />
        </div>
        <div class="form-group">
          <label for="userPassword">Ingrese su contraseña</label>
          <input
            type="password"
            class="form-control"
            id="userPassword"
            minLength="8"
            required
            placeholder="********"
          />
        </div>
        <button type="submit" class="signin-btn btn btn-primary float-right">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default SigninScreen;
