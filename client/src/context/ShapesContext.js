import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const shapesReducer = (state, action) => {
  switch (action.type) {
    case "upload_progress":
      return { ...state, uploadProgress: action.payload, hideLoading: false };
    case "new_shape":
      return { ...state, message: action.payload, hideLoading: true };
    case "shapes_categories":
      return { shapesCategories: action.payload, errorMessage: "" };
    case "shapes_list":
    case "shapes_list_all":
      return { ...state, shapesList: action.payload, errorMessage: "" };
    case "delete_shape":
      return { ...state, message: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload, hideLoading: true };
    case "clear_shape":
      return { errorMessage: "", message: "" };
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

const deleteShape = (dispatch) => async (idShape) => {
  try {
    dispatch({ type: "clear_message" });

    const response = await SgedAPi.delete(`shapes/delete?id_shape=${idShape}`);

    response.data.status
      ? dispatch({ type: "delete_shape", payload: response.data.message })
      : dispatch({ type: "add_error", payload: response.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const getAllShapes = (dispatch) => async () => {
  try {
    const shapes = await SgedAPi.get("/shapes/list/all");

    shapes.data.status
      ? dispatch({ type: "shapes_list_all", payload: shapes.data.shapes })
      : dispatch({ type: "add_error", payload: shapes.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const createNewShape = (dispatch) => async ({
  nombre_shape,
  resumen_shape,
  autor_shape,
  shape_fecha_metadato,
  id_categoria,
  shape_file,
  nombre_categoria,
}) => {
  try {
    const formData = new FormData();

    formData.append("shape_file", shape_file);
    formData.append("nombre_shape", nombre_shape);
    formData.append("resumen_shape", resumen_shape);
    formData.append("autor_shape", autor_shape);
    formData.append("shape_fecha_metadato", shape_fecha_metadato);
    formData.append("id_categoria", id_categoria);
    formData.append("nombre_categoria", nombre_categoria);

    const newShape = await SgedAPi.post("/shapes/new", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (ev) => {
        const progress = (ev.loaded / ev.total) * 100;

        if (progress < 100) {
          dispatch({ type: "upload_progress", payload: Math.round(progress) });
        }
      },
    });

    newShape.data.status
      ? dispatch({ type: "new_shape", payload: newShape.data.message })
      : dispatch({ type: "add_error", payload: newShape.data.error });
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
  {
    deleteShape,
    getAllShapes,
    getShapesCategories,
    shapesListByCategory,
    downloadShape,
    clearShape,
    createNewShape,
  },
  {
    uploadProgress: 0,
    shapesList: null,
    shapesCategories: null,
    errorMessage: "",
    message: "",
    hideLoading: false,
  }
);
