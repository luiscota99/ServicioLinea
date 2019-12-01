import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `https://serene-caverns-45663.herokuapp.com/api/pedido`
  });
};
