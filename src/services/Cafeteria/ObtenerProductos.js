import Api from "./CafeteriaApi";

export default {
  getProductos() {
    return Api().get("/");
  }
};
