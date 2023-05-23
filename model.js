const mongoose = require("mongoose");

const UserNames = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("usernames", UserNames);
