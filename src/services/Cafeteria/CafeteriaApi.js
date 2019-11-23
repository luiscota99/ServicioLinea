import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `https://cafeteria-cine.herokuapp.com/productos`
  });
};
