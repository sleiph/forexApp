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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock"
      }
    ],
    trades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trade"
      }
    ]
  })
);

module.exports = User;
