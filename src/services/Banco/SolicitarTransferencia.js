import Api from "./BancoApi";

export default {
  postTransferencia(datos) {
    return Api().post("/", datos);
  }
};
