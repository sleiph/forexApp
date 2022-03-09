const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    credits: Number,
    stocks: [
      {
        name: String,
        quantity: Number
      }
    ],
    trades: [
      {
        name: String,
        quantity: Number,
        trade_type: String
      }
    ]
  })
);

module.exports = User;
