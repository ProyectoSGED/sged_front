import React from "react";

const SubmitMessage = ({ successMessage, errorMessage, handleMessage }) => {
  return (
    <div
      className={`alert ${
        successMessage ? "alert-success" : errorMessage ? "alert-danger" : null
      } `}
      role="alert"
    >
      {successMessage ? successMessage : errorMessage ? errorMessage : null}
    </div>
  );
};

export default SubmitMessage;
