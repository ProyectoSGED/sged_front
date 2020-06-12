import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const currentPath = useLocation();

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
        <h4 className="header-title">Sistema de gestión de desastres</h4>
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
      </ul>
    </nav>
  );
};

export default Header;
