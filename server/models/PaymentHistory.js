const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const ads = new mongoose.Schema(
  {
    senderID: { type: String, required: true },
    reciverID: { type: String, required: true },
    SendertxID: { type: String, required: true },
    RecivertxID: { type: String, required: true },
    Reciverchain: { type: String, required: true },
    Senderchain: { type: String, required: true },
  },
  { timestamps: true }
);

const Ads = mongoose.model("Ads", ads);
module.exports = Ads;
