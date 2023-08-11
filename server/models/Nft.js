const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const Nft = new mongoose.Schema({
  orbID: { type: String, required: true },
  ownerNull: { type: String, required: true },
  Zoralink: { type: String, required: true },
  price: { type: String, required: true },
});

const Nfts = mongoose.model("Nft", Nft);
module.exports = Nfts;
