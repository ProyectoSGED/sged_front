import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const currentPath = useLocation();

  function handleSelectedItem(routeName) {
    setSelectedItem(routeName);
  }

  function signout() {
    localStorage.removeItem("user");
  }

  useEffect(() => {
    handleSelectedItem(currentPath.pathname);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          width="290"
          height="66"
          alt="logo_obs"
          loading="lazy"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/logo_ide.png`}
          width="66"
          height="66"
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
            Descarga de capas
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
        {!localStorage.getItem("user") ? (
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
              to="/signin"
              data-toggle="dropdown"
              aria-expanded="false"
              aria-haspopup="true"
            >
              Bienvenido: {localStorage.getItem("user")}
            </Link>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <Link className="dropdown-item" to="#">
                  Administrar usuarios
                </Link>
                <ul className="submenu submenu-left dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Listado de usuarios
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Crear nuevo usuario
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Administrar shapes
                </Link>
                <ul className="submenu submenu-left dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Listado de shapes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Cargar nuevo shape
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="/"
                  className="dropdown-item"
                  onClick={() => {
                    signout();
                  }}
                >
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
