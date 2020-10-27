import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <h5 style={{ marginTop: 5 }}>Cargando...</h5>

      <div className="float-right spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loading;
