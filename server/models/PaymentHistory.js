const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const ads = new mongoose.Schema({
  userID: { type: String, required: true },
  BussinessID: { type: String, required: true },
  txID: { type: String, required: true },
});

const Ads = mongoose.model("Ads", ads);
module.exports = Ads;
