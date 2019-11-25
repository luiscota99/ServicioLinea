import Api from "./Api";

export default {
  getVentas() {
    return Api().get("/");
  }
};
