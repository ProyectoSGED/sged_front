import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const contactReducer = (state, action) => {
  switch (action.type) {
    case "send_contact_mail":
      return { message: action.payload, errorMessage: "", hideLoading: true };
    case "clear_message":
      return { message: "", errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload, hideLoading: true };
    default:
      return state;
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

const sendContactMail = (dispatch) => async ({
  name,
  phone,
  mail,
  message,
}) => {
  try {
    const contactMessage = await SgedAPi.post("/contact", {
      name,
      phone,
      mail,
      message,
    });

    contactMessage.data.status
      ? dispatch({
          type: "send_contact_mail",
          payload: contactMessage.data.message,
        })
      : dispatch({
          type: "add_error",
          payload: "Ocurrio un error al enviar mensaje de contacto...",
        });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Ocurrio un error al enviar mensaje de contacto...",
    });
  }
};

export const { Provider, Context } = CreatedataContext(
  contactReducer,
  {
    sendContactMail,
    clearMessage,
  },
  {
    hideLoading: false,
    errorMessage: "",
    message: "",
  }
);
