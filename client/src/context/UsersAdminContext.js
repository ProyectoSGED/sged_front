import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const userAdminReducer = (state, action) => {
  switch (action.type) {
    case "get_user":
      return { ...state, user: action.payload, errorMessage: "" };
    case "get_users_list":
      return { ...state, userList: action.payload, errorMessage: "" };
    case "deactivate_user":
      return { ...state, message: action.payload };
    case "update_user":
      return {
        ...state,
        message: action.payload,
        errorMessage: "",
        hideLoading: true,
      };
    case "new_user":
      return {
        ...state,
        hideLoading: true,
        message: action.payload,
        errorMessage: "",
      };
    case "profile_list":
      return { ...state, profiles: action.payload };
    case "clear_message":
      return { ...state, errorMessage: "", message: "" };
    case "add_error":
      return {
        ...state,
        hideLoading: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
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
  userEmail,
}) => {
  try {
    const newUser = await SgedAPi.post("/users/new", {
      nombre_usuario: userName,
      primer_nombre: firstName,
      primer_apellido: lastName,
      password: password,
      id_perfil: profileId,
      mail_usuario: userEmail,
    });

    newUser.data.status
      ? dispatch({ type: "new_user", payload: newUser.data.message })
      : dispatch({
          type: "add_error",
          payload: newUser.data.error,
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

const getUserById = (dispatch) => async (userId) => {
  try {
    const user = await SgedAPi.get(`/users/get?id_usuario=${userId}`);

    user.data.status
      ? dispatch({ type: "get_user", payload: user.data.user })
      : dispatch({ type: "add_error", payload: user.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const editUser = (dispatch) => async ({
  userId,
  userName,
  firstName,
  lastName,
  userActive,
  profileId,
  userEmail,
}) => {
  try {
    const response = await SgedAPi.put(
      `/users/update?
        id_usuario=${userId}
        &nombre_usuario=${userName}
        &primer_nombre=${firstName}
        &primer_apellido=${lastName}
        &usuario_activo=${userActive}
        &id_perfil=${profileId}
        &mail_usuario=${userEmail}`
    );

    response.data.status
      ? dispatch({ type: "update_user", payload: response.data.message })
      : dispatch({ type: "add_error", payload: response.data.error });
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
  {
    getUsersList,
    clearMessage,
    deactivateUser,
    getProfileList,
    createNewUser,
    getUserById,
    editUser,
  },
  {
    user: null,
    userList: null,
    errorMessage: "",
    message: "",
    hideLoading: false,
    profiles: null,
  }
);
