import Api from "./MembresiaApi";

export default {
  getMembresia(id) {
    return Api().get("/solicitardatos", { params: id });
  },

  generatePoints(data) {
    return Api().post("/GenerarPuntos", data);
  }
};
