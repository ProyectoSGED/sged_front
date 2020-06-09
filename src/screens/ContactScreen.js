import React, { useState } from "react";

const ContactScreen = () => {
  const [textCount, setTextCount] = useState(0);

  function getCurrentText(e) {
    let currentText = e.target.value;
    setTextCount(currentText.length);
  }

  return (
    <div className="container-md contact-container">
      <form>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
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
            type="text"
            className="form-control"
            id="phone-number"
            maxLength="12"
            placeholder={"+5621234567 / +56912345678"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Dirección de correo</label>
          <input
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
            className="form-control"
            id="question"
            rows="3"
            maxLength="500"
            required
            onChange={getCurrentText}
          ></textarea>
          <small>total de caracteres: {textCount}</small>
        </div>
        <button type="submit" className="btn btn-primary float-right">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ContactScreen;
