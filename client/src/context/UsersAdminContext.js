import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const userAdminReducer = (state, action) => {
  switch (action.type) {
    case "get_users_list":
      return { userList: action.payload, errorMessage: "" };
    case "deactivate_user":
      return { ...state, message: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };

    default:
      return state;
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
  { getUsersList, deactivateUser },
  { userList: null, errorMessage: "", message: "" }
);
