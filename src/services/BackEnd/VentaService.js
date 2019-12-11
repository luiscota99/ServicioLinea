import Api from "./Api";

export default {
  getVentas(data) {
    return Api().get("/", data);
  },

  postVenta(data) {
    return Api().post("/", data);
  }
};
