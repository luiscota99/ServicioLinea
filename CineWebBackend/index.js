const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
mongoose
  .connect("mongodb://localhost/DB", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

const ventas = require("./routes/venta");

app.use("/ventaLineaApi/venta", ventas);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server on Port ${port}`);
});
