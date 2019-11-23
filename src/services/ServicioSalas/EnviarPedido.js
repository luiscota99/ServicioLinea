import Api from "./ServicioSalasApi";

export default {
  postPedido(datos) {
    return Api().post("/", datos);
  }
};
