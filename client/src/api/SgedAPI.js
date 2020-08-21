import axios from "axios";

export default axios.create({
  //CAMBIAR A URL PARA CONSUMIR API
  baseURL: `${process.env.REACT_APP_API_HOST}/api`,
  timeout: 300000,
});
