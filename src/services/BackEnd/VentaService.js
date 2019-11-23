import Api from "./Api";

export default {
  getVentas() {
    return Api().get("/");
  },
  addVenta(datos) {
    return Api().post("/", datos);
  },
  deleteVenta(datos) {
    return Api().delete(`/${datos}`);
  }
};
