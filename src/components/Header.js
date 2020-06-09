import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navigation navbar navbar-light bg-ligth">
      <Link className="navbar-brand" to="/">
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
        <li className="nav-item">
          <Link to="/" className="home nav-link">
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/shapes" className="download nav-link">
            Descarga de capas
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="contact nav-link">
            Formulario de contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
