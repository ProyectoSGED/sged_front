import React from "react";

const Footer = () => {
  return (
    <footer className="footer page-footer font-small">
      <div className="container-fluid">
        <div className="footer-items-container row">
          <div>
            <h5 className="footer-text">Sistema de gestión de desastres</h5>
          </div>
          <div>
            <small>v1.0 año 2020</small>
          </div>
          <div>
            <h5 className="footer-text">
              &copy; Observatorio de Investigación UBO
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;