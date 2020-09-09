import React from "react";

const SubmitMessage = ({ successMessage, errorMessage, handleMessage }) => {
  return (
    <div
      className={`alert ${
        successMessage ? "alert-success" : errorMessage ? "alert-danger" : null
      } alert-dismissible fade show`}
      role="alert"
    >
      {successMessage ? successMessage : errorMessage ? errorMessage : null}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={handleMessage}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default SubmitMessage;
