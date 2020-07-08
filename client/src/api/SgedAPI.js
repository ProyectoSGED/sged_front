import axios from "axios";

export default axios.create({
  //CAMBIAR A URL PARA CONSUMIR API
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
});
