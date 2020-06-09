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
        <img
          src={`${process.env.PUBLIC_URL}/images/logo_obs.jpg`}
          width="300"
          height="76"
          alt="logo_obs"
          loading="lazy"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/logo_ide.png`}
          width="76"
          height="76"
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
      </ul>
    </nav>
  );
};

export default Header;
