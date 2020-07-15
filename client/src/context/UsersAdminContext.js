import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const userAdminReducer = (state, action) => {
  switch (action.type) {
    case "get_users_list":
      return { userList: action.payload, errorMessage: "" };
    case "deactivate_user":
      return { ...state, message: action.payload };
    case "new_user":
      return { ...state, message: action.payload };
    case "profile_list":
      return { profiles: action.payload, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getProfileList = (dispatch) => async () => {
  try {
    const profileList = await SgedAPi.get("/profiles");

    profileList.data.status
      ? dispatch({ type: "profile_list", payload: profileList.data.profiles })
      : dispatch({ type: "add_error", payload: profileList.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const createNewUser = (dispatch) => async ({
  userName,
  firstName,
  lastName,
  profileId,
  password,
}) => {
  try {
    const newUser = await SgedAPi.post("/users/new", {
      nombre_usuario: userName,
      primer_nombre: firstName,
      primer_apellido: lastName,
      password: password,
      id_perfil: profileId,
    });

    newUser.data.status
      ? dispatch({ type: "new_user", payload: newUser.data.message })
      : dispatch({
          type: "add_error",
          payload: "Ocurrio un error creando nuevo usuario",
        });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const getUsersList = (dispatch) => async () => {
  try {
    const usersList = await SgedAPi.get("/users/list");

    usersList.data.status
      ? dispatch({ type: "get_users_list", payload: usersList.data.users })
      : dispatch({ type: "add_error", payload: usersList.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const deactivateUser = (dispatch) => async (userId) => {
  try {
    const response = await SgedAPi.delete(
      `users/deactivate?id_usuario=${userId}`
    );

    response.data.status
      ? dispatch({ type: "deactivate_user", payload: response.data.message })
      : dispatch({ type: "add_error", payload: response.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

export const { Provider, Context } = CreatedataContext(
  userAdminReducer,
  { getUsersList, deactivateUser, getProfileList, createNewUser },
  { userList: null, errorMessage: "", message: "", profiles: null }
);
