import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer page-footer font-small">
      <div className="container-fluid">
        <div className="footer-items-container row">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <a href={"https://www.ubo.cl/"} target="_blank">
              <img
                src={`${process.env.PUBLIC_URL}/logo_footer.png`}
                width="68"
                height="33"
                alt="logo_footer"
                loading="lazy"
              />
            </a>
            <h4 className="footer-text">Sistema de Información Territorial</h4>
          </div>
          <div>
            <small>v1.0 año 2020</small>
          </div>
          <div>
            <h5 className="footer-text">
              &copy; Observatorio en Gestión del Riesgo de Desastre
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
