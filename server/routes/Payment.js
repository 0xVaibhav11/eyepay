const router = require("express").Router();
const History = require("../models/PaymentHistory");

router.route("/").post(async (req, res) => {
  console.log(req.body);
  try {
    const {
      senderID,
      reciverID,
      SendertxID,
      RecivertxID,
      Reciverchain,
      Senderchain,
    } = req.body;

    const history = new History({
      senderID,
      reciverID,
      SendertxID,
      RecivertxID,
      Reciverchain,
      Senderchain,
    });

    await history.save();

    res.send({ message: "sucsses" });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.route("/get/:senderID").post(async (req, res) => {
  try {
    const { senderID } = req.params;

    const Result = await History.find({ senderID: { $eq: senderID } });
    console.log(Result);
    res.send(Result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.route("/get/:reciverID").get(async (req, res) => {
  try {
    const { reciverID } = req.params;

    const Result = await History.find({ reciverID: { $eq: reciverID } });
    console.log(Result);
    res.send(Result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
