import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const shapesReducer = (state, action) => {
  switch (action.type) {
    case "shapes_categories":
      return { shapesCategories: action.payload, errorMessage: "" };
    case "shapes_list":
      return { shapesList: action.payload, errorMessage: "" };
    case "add_error":
      return { errorMessage: action.payload };
    default:
      return state;
  }
};

const getShapesCategories = (dispatch) => async () => {
  try {
    const shapesCategories = await SgedAPi.get("/shapes/categories");

    shapesCategories.data.status
      ? dispatch({
          type: "shapes_categories",
          payload: shapesCategories.data.categorias_shape,
        })
      : dispatch({ type: "add_error", payload: shapesCategories.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const shapesListByCategory = (dispatch) => async (idCategoria) => {
  try {
    const shapes = await SgedAPi.get(
      `/shapes/list?id_categoria=${idCategoria}`
    );

    shapes.data.status
      ? dispatch({ type: "shapes_list", payload: shapes.data.shapes })
      : dispatch({ type: "add_error", payload: shapes.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

export const { Provider, Context } = CreatedataContext(
  shapesReducer,
  { getShapesCategories, shapesListByCategory },
  { shapesList: null, shapesCategories: null, errorMessage: "" }
);
