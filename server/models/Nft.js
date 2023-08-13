const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const Nft = new mongoose.Schema(
  {
    orbID: { type: String, required: true },
    ownerNull: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Nfts = mongoose.model("Nft", Nft);
module.exports = Nfts;
