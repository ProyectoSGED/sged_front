import CreatedataContext from "./CreateDataContext";
import SgedAPi from "../api/SgedAPI";

const shapesReducer = (state, action) => {
  switch (action.type) {
    case "get_shape":
      return { ...state, shape: action.payload };
    case "upload_progress":
      return {
        ...state,
        uploadProgress: action.payload,
        hideLoading: false,
        message: "",
        errorMessage: "",
      };
    case "new_shape":
      return {
        ...state,
        message: action.payload,
        hideLoading: true,
        errorMessage: "",
        clearForm: true,
      };

    case "update_shape":
      return {
        ...state,
        message: action.payload,
        hideLoading: true,
        errorMessage: "",
        clearForm: true,
      };
    case "shapes_categories":
      return { ...state, shapesCategories: action.payload, errorMessage: "" };
    case "shapes_list":
    case "shapes_list_all":
      return {
        ...state,
        shapesList: action.payload,
        errorMessage: "",
        showMessage: true,
      };
    case "delete_shape":
      return { ...state, message: action.payload, showMessage: true };
    case "add_error":
      return {
        ...state,
        errorMessage: action.payload,
        hideLoading: true,
        showMessage: true,
      };
    case "clear_shapes":
      return { shapesList: null };
    case "clear_message":
      return { ...state, errorMessage: "", message: "" };
    case "shapes_categories_all":
      return { ...state, shapesCategoriesAll: action.payload };
    default:
      return state;
  }
};

const clearShape = (dispatch) => () => {
  dispatch({ type: "clear_shapes" });
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

const getShapeByQuery = (dispatch) => async (query) => {
  try {
    const shapes = await SgedAPi.get(`/shapes/search/?query=${query}`);

    shapes.data.status
      ? dispatch({ type: "shapes_list", payload: shapes.data.shapes })
      : dispatch({ type: "add_error", payload: shapes.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
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
  formato_capa_informacion,
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
    formData.append("formato_capa_informacion", formato_capa_informacion);
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

const getShapesCategoriesAll = (dispatch) => async () => {
  try {
    const shapesCategories = await SgedAPi.get("/shapes/categories/all");

    shapesCategories.data.status
      ? dispatch({
          type: "shapes_categories_all",
          payload: shapesCategories.data.shapes_categories,
        })
      : dispatch({ type: "add_error", payload: shapesCategories.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const updateShape = (dispatch) => async ({
  id_shape,
  nombre_shape,
  resumen_shape,
  autor_shape,
  formato_capa_informacion,
  id_categoria,
  shape_file,
  nombre_categoria,
  update_shape_file,
}) => {
  try {
    const formData = new FormData();

    formData.append("id_shape", id_shape);
    formData.append("nombre_shape", nombre_shape);
    formData.append("resumen_shape", resumen_shape);
    formData.append("autor_shape", autor_shape);
    formData.append("formato_capa_informacion", formato_capa_informacion);
    formData.append("id_categoria", id_categoria);
    formData.append("nombre_categoria", nombre_categoria);
    formData.append("_method", "PUT");

    let updateShape;

    if (update_shape_file) {
      formData.append("shape_file", shape_file);
      formData.append("update_shape_file", update_shape_file);

      updateShape = await SgedAPi.post("/shapes/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ev) => {
          const progress = (ev.loaded / ev.total) * 100;

          if (progress < 100) {
            dispatch({
              type: "upload_progress",
              payload: Math.round(progress),
            });
          }
        },
      });
    } else {
      updateShape = await SgedAPi.post("/shapes/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    updateShape.data.status
      ? dispatch({ type: "update_shape", payload: updateShape.data.message })
      : dispatch({ type: "add_error", payload: updateShape.data.error });
  } catch (err) {
    dispatch({ type: "add_error", payload: err.message });
  }
};

const getShapeById = (dispatch) => async (idShape) => {
  try {
    const shape = await SgedAPi.get(`/shapes/get?id_shape=${idShape}`);

    shape.data.status
      ? dispatch({ type: "get_shape", payload: shape.data.shape })
      : dispatch({ type: "add_error", payload: shape.data.error });
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
    clearMessage,
    createNewShape,
    getShapeById,
    updateShape,
    clearShape,
    getShapeByQuery,
    getShapesCategoriesAll,
  },
  {
    shapesCategoriesAll: null,
    uploadProgress: 0,
    shapesList: null,
    shape: null,
    shapesCategories: null,
    errorMessage: "",
    message: "",
    hideLoading: false,
    showMessage: false,
    clearForm: false,
  }
);
