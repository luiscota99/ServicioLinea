import Api from "./FinanzasApi";

export default {
  addVentas(datos) {
    return Api().post("/", datos);
  }
};
