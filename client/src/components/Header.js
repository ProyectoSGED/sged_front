import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context as SessionContext } from "../context/SessionContext";

const Header = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const { signout } = useContext(SessionContext);

  const currentPath = useLocation();
  const { user, profile } = localStorage.getItem("session")
    ? JSON.parse(localStorage.getItem("session"))
    : "";

  function handleSelectedItem(routeName) {
    setSelectedItem(routeName);
  }

  useEffect(() => {
    handleSelectedItem(currentPath.pathname);
  }, []);

  return (
    <nav className="navigation navbar navbar-light bg-ligth">
      <Link
        className="navbar-brand"
        to="/"
        onClick={() => {
          handleSelectedItem("/");
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/logo_obs.jpg`}
          width="250"
          height="63.3"
          alt="logo_obs"
          loading="lazy"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/logo_ide.png`}
          width="120"
          height="63.3"
          alt="logo_ide"
          loading="lazy"
        />
      </Link>
      <ul className="navigationElementsContainer nav justify-content-end">
        <li className="nav-link nav-item">
          <Link
            to="/"
            className={`home nav-link ${
              selectedItem === "/" ? "selected-item" : null
            }`}
            onClick={() => {
              handleSelectedItem("/");
            }}
          >
            Inicio
          </Link>
        </li>
        <li className="nav-link nav-item">
          <Link
            to="/shapes"
            className={`download nav-link ${
              selectedItem === "/shapes" ? "selected-item" : null
            }`}
            onClick={() => {
              handleSelectedItem("/shapes");
            }}
          >
            Descarga capas de información
          </Link>
        </li>
        <li className="nav-link nav-item">
          <Link
            to="/contact"
            className={`contact nav-link ${
              selectedItem === "/contact" ? "selected-item" : null
            }`}
            onClick={() => {
              handleSelectedItem("/contact");
            }}
          >
            Formulario de contacto
          </Link>
        </li>
        {!localStorage.getItem("session") ? (
          <li className="nav-link nav-item">
            <Link
              to="/signin"
              className={`signin nav-link ${
                selectedItem === "/signin" ? "selected-item" : null
              }`}
              onClick={() => {
                handleSelectedItem("/signin");
              }}
            >
              Iniciar sesión
            </Link>
          </li>
        ) : (
          <li className="nav-item nav-link dropdown">
            <Link
              className="nav-link signin"
              to="#"
              data-toggle="dropdown"
              aria-expanded="false"
              aria-haspopup="true"
            >
              Bienvenido: {user}
            </Link>
            <ul className="dropdown-menu dropdown-menu-right">
              {profile.toUpperCase() === "ADMINISTRADOR" ? (
                <li id="users-admin">
                  <Link className="dropdown-item" to="#">
                    Administrar usuarios
                  </Link>
                  <ul className="submenu submenu-left dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/users/list">
                        Listado de usuarios
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/users/create">
                        Crear nuevo usuario
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : null}

              {profile.toUpperCase() === "ADMINISTRADOR" ||
              profile.toUpperCase() === "EDITOR" ? (
                <li id="shapes-admin">
                  <Link className="dropdown-item" to="#">
                    Administrar capas de información
                  </Link>
                  <ul className="submenu submenu-left dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/shapes/list">
                        Listado capas de información
                      </Link>
                    </li>
                    {profile.toUpperCase() === "ADMINISTRADOR" ? (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/shapes/create"
                        >
                          Cargar nueva capa de información
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </li>
              ) : null}
              <li>
                <Link
                  className="dropdown-item"
                  onClick={() => {
                    signout();
                  }}
                  to="/"
                >
                  Cerrar sesión
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
