const express = require("express");

const router = express.Router();

const Venta = require("../models/Venta");

router.get("/", async (req, res) => {
  const ventas = await Venta.find();
  res.json(ventas);
});

router.post("/", async (req, res) => {
  const venta = new Venta(req.body);
  await venta.save();
  res.json({
    status: "Venta Agregada"
  });
});

module.exports = router;
