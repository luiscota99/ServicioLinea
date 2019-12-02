import Api from "./TaquillaApi";

export default {
  getAsientos() {
    return Api().get("/GetShowSeats");
  }
};
