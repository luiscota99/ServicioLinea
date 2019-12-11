import Api from "./TaquillaApi";

export default {
  postTicketSale(data) {
    return Api().post("/SelectShowSeats", data);
  }
};
