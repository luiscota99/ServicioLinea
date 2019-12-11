import Api from "./Api";

export default {
  getVentas() {
    return Api().get("/");
  },

  getVenta(id) {
    return Api().get(`/${id}`);
  },

  postVenta(data) {
    return Api().post("/", data);
  }
};
