const router = require("express").Router();
const History = require("../models/PaymentHistory");

router.route("/").post(async (req, res) => {
  console.log(req.body);
  try {
    const { userID, BussinessID, txID } = req.body;

    const history = new History({
      userID,
      BussinessID,
      txID,
    });

    await history.save();

    res.send({ message: "sucsses" });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.route("/get/userID").post(async (req, res) => {
  try {
    const userID = req.body.userID;

    const Result = await History.find({ userID: { $eq: userID } });
    console.log(Result);
    res.send(Result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.route("/get/:userID").get(async (req, res) => {
  try {
    const { userID } = req.params;

    const Result = await History.find({ userID: { $eq: userID } });
    console.log(Result);
    res.send(Result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
router.route("/get/:BussinessID").get(async (req, res) => {
  try {
    const { BussinessID } = req.params;

    const Result = await History.find({ BussinessID: { $eq: BussinessID } });
    console.log(Result);
    res.send(Result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.route("/delete/:_id").put(async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    await History.findByIdAndDelete(_id);
    res.send({ message: "sucsses" });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
module.exports = router;
