import React from "react";
import Iframe from "react-iframe";

const MapScreen = () => {
  return (
    <div className="screen-container container-fluid">
      <Iframe className="map-iframe" url={`${process.env.REACT_APP_MAP_URI}`} />
    </div>
  );
};

export default MapScreen;
