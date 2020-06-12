import React from "react";

const Footer = () => {
  return (
    <footer className="footer page-footer font-small">
      <div className="container-fluid">
        <div className="footer-items-container row">
          <div>
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
          </div>
          <div>
            <small>v1.0 año 2020</small>
          </div>
          <div>
            <h5>Observatorio de Investigación UBO</h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
