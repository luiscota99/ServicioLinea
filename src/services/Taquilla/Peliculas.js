import Api from "./TaquillaApi";

export default {
  getPeliculas() {
    return Api().get("/GetShowTimes");
  }
};
