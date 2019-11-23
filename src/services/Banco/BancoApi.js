import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `http://138.68.6.44:8000/api/transacciones/transferencias`,
    headers: { "content-type": "multipart/form-data" }
  });
};
