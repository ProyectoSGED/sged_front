import React from "react";

function signin() {
  localStorage.setItem("user", "loncho");
}

const SigninScreen = () => {
  return (
    <div className="container-md signin-container">
      <form
        className="signin-form"
        onSubmit={() => {
          signin();
        }}
      >
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
        <div className="form-group">
          <label htmlFor="userPassword">Ingrese su contraseña</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            minLength="8"
            required
            placeholder="********"
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
