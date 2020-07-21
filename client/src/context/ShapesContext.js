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
    case "clear_shape":
      return { shapeList: null };
    default:
      return state;
  }
};

const clearShape = (dispatch) => () => {
  dispatch({ type: "clear_shape" });
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

const downloadShape = (dispatch) => async (idShape, shapeName) => {
  try {
    const url = `/shapes/file?id_shape=${idShape}`;

    SgedAPi.request({
      url,
      method: "GET",
      responseType: "blob",
    }).then(({ data }) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${shapeName}.zip`);

      document.body.appendChild(link);

      link.click();
      link.remove();
    });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

export const { Provider, Context } = CreatedataContext(
  shapesReducer,
  { getShapesCategories, shapesListByCategory, downloadShape, clearShape },
  { shapesList: null, shapesCategories: null, errorMessage: "" }
);
