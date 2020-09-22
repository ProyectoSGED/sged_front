import React, { useState, useContext, useEffect } from "react";
import { Context as ContactContext } from "../context/ContactContext";
import SubmitMessage from "../components/SubmitMessage";

const ContactScreen = () => {
  const [textCount, setTextCount] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const { state, sendContactMail, clearMessage } = useContext(ContactContext);

  function getCurrentText(e) {
    setTextCount(e.target.value.length);
  }

  function onSubmit(e) {
    e.preventDefault();

    setShowLoading(true);

    sendContactMail({
      name: e.target.name.value,
      phone: e.target.phoneNumber.value,
      mail: e.target.email.value,
      message: e.target.question.value,
    });
  }

  useEffect(() => {
    setShowLoading(false);
  }, [state.message]);

  if (state.message) {
    document.getElementById("contact-form").reset();
  }

  return (
    <div className="container-md screen-container">
      {state.message || state.errorMessage ? (
        <SubmitMessage
          successMessage={state.message}
          errorMessage={state.errorMessage}
        />
      ) : null}
      <h4 className="contact-title">Ingrese información de contacto</h4>
      <form
        id="contact-form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            onFocus={() => clearMessage()}
            type="text"
            className="form-control"
            id="name"
            required
            placeholder={"Nombre Apellido"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone-number">Teléfono</label>
          <input
            onFocus={() => clearMessage()}
            type="text"
            className="form-control"
            id="phoneNumber"
            maxLength="12"
            placeholder={"+5621234567 / +56912345678"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Dirección de correo</label>
          <input
            onFocus={() => clearMessage()}
            type="email"
            className="form-control"
            id="email"
            required
            placeholder={"mail@mail.com"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">
            Indique su consulta (no más de 500 caracteres)
          </label>
          <textarea
            onFocus={() => clearMessage()}
            className="form-control"
            id="question"
            rows="3"
            maxLength="500"
            required
            onChange={(e) => {
              getCurrentText(e);
            }}
          ></textarea>
          <small>total de caracteres: {textCount}</small>
        </div>

        {showLoading && !state.hideLoading ? (
          <div className="loading-container">
            <div
              className="float-right spinner-border text-primary"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="send-contact-btn btn btn-primary float-right"
          >
            Enviar
          </button>
        )}
      </form>
    </div>
  );
};

export default ContactScreen;
