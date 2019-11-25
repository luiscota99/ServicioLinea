import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `https://cinemappi.herokuapp.com/API/venta`
  });
};
