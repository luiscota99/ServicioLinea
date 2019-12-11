import Api from "./Api";

export default {
  getVentas(data) {
    return Api().get("/", data);
  }
};
