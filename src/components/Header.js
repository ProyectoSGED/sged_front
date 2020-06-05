import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navigation navbar navbar-light bg-ligth">
      <a className="navbar-brand" href="#">
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
      </a>
      <ul className="navigationElementsContainer nav justify-content-end">
        <li className="nav-item">
          <Link to="#" className="home nav-link">
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="download nav-link">
            Descarga de capas
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="contact nav-link">
            Formulario de contacto
          </Link>
        </li>
        <li className="nav-item">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Buscar capas"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              Buscar
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
