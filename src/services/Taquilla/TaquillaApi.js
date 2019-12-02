import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `https://taquilla2.gear.host/api/booth`
  });
};
