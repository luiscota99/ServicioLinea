import Api from "./TaquillaApi";

export default {
  getAsientos(param) {
    return Api().get("/GetShowSeats", { params: param });
  }
};
