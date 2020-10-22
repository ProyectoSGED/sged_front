import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const sessionReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { session: action.payload };
    case "reset_password":
      return { ...state, message: action.payload, showSignInSession: true };
    case "verify_change_password":
      if (action.payload) {
        return {
          ...state,
          changeUserPassword: action.payload,
          redirectToHome: false,
        };
      } else {
        return {
          ...state,
          changeUserPassword: action.payload,
          redirectToHome: true,
        };
      }
    case "signout":
      return { session: null, message: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "change_password":
      return { ...state, passwordUpdated: true };
    case "clear_message":
      return { errorMessage: "", message: "" };
    default:
      return state;
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

const signin = (dispatch) => async ({ userName, password }) => {
  try {
    const userSession = await SgedAPi.post("/signin", {
      nombre_usuario: userName,
      password,
    });

    userSession.data.status
      ? dispatch({
          type: "signin",
          payload: userSession.data,
        })
      : dispatch({
          type: "add_error",
          payload: userSession.data.error,
        });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Ocurrio un error al iniciar sesión de usuario...",
    });
  }
};

const resetPassword = (dispatch) => async (userEmail) => {
  try {
    const response = await SgedAPi.post("/password-reset", {
      user_email: userEmail,
    });

    response.data.status
      ? dispatch({
          type: "reset_password",
          payload: response.data.message,
        })
      : dispatch({
          type: "add_error",
          payload: response.data.error,
        });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Ocurrio un error al enviar nueva contraseña a usuario...",
    });
  }
};

const verifyChangeUserPassword = (dispatch) => async () => {
  try {
    const { access_type, token } = JSON.parse(localStorage.getItem("session"));

    const response = await SgedAPi.get("/users/verify-change-password", {
      headers: { Authorization: `${access_type} ${token}` },
    });

    response.data.status
      ? dispatch({
          type: "verify_change_password",
          payload: response.data.change_password,
        })
      : dispatch({
          type: "add_error",
          payload: response.data.error,
        });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Ocurrio un error al verificar cambio de contraseña...",
    });
  }
};

const changePassword = (dispatch) => async ({
  currentPassword,
  password,
  passwordConfirmation,
}) => {
  try {
    const { access_type, token } = JSON.parse(localStorage.getItem("session"));

    const response = await SgedAPi.post(
      "/password-change",
      {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      },
      {
        headers: { Authorization: `${access_type} ${token}` },
      }
    );

    response.data.status
      ? dispatch({
          type: "change_password",
          payload: response.data.message,
        })
      : dispatch({
          type: "add_error",
          payload: response.data.error,
        });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Ocurrio un error al cerrar sesión de usuario...",
    });
  }
};

const signout = (dispatch) => async () => {
  try {
    const { access_type, token } = JSON.parse(localStorage.getItem("session"));

    const userSession = await SgedAPi.get("/signout", {
      headers: { Authorization: `${access_type} ${token}` },
    });

    if (userSession.data.status) {
      localStorage.removeItem("session");
      dispatch({
        type: "signout",
        payload: "Sesión de usuario cerrada con éxito",
      });

      window.location.reload();
    } else {
      dispatch({
        type: "add_error",
        payload: "Ocurrio un error al cerrar sesión de usuario...",
      });
    }
  } catch (err) {
    console.log(err);

    dispatch({
      type: "add_error",
      payload: "Ocurrio un error al cerrar sesión de usuario...",
    });
  }
};

export const { Provider, Context } = CreatedataContext(
  sessionReducer,
  {
    signin,
    signout,
    clearMessage,
    resetPassword,
    verifyChangeUserPassword,
    changePassword,
  },
  {
    session: null,
    errorMessage: "",
    message: "",
    redirectToHome: false,
    showSignInSession: false,
    changeUserPassword: false,
    passwordUpdated: false,
  }
);
