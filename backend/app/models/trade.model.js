const mongoose = require("mongoose");

const Trade = mongoose.model(
  "Trade",
  new mongoose.Schema({
    name: String,
    quantity: Number,
    trade_type: String
  })
);

module.exports = Trade;
