const mongoose = require("mongoose");

const Stock = mongoose.model(
  "Stock",
  new mongoose.Schema({
    name: String,
    quantity: Number
  })
);

module.exports = Stock;
