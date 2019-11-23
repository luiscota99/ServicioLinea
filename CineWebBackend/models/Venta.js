const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { Schema } = mongoose;

const Venta = new Schema(
  {
    id_venta: Number,
    fecha: String,
    detalles: [],
    total: Number
  },
  {
    collection: "Ventas"
  }
);

module.exports = mongoose.model("Venta", Venta);
