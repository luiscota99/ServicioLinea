import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `https://serviciosalas.herokuapp.com/api/pedido`
  });
};
