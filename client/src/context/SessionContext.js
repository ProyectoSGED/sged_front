import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const sessionReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { session: action.payload };
    case "signout":
      return { session: null, message: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_message":
      return { errorMessage: "" };
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
  { signin, signout, clearMessage },
  { session: null, errorMessage: "", message: "" }
);
