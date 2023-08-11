const router = require("express").Router();
const Nfts = require("../models/Nft");

router.route("/").post(async (req, res) => {
  console.log(req.body);
  try {
    const { orbID, ownerNull, Zoralink, price } = req.body;

    const Nft = new Nfts({
      orbID,
      ownerNull,
      Zoralink,
      price,
    });

    await Nft.save();

    res.send({ message: "sucsses" });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.route("/:orbID").get(async (req, res) => {
  try {
    const { orbID } = req.params;
    console.log(orbID);

    const Result = await Nfts.find({ orbID: { $eq: orbID } });
    console.log(Result);
    res.send(Result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.put("/updateNft/:orbID", async (req, res) => {
  console.log(req.body);
  console.log(req.params.orbID);
  try {
    const Result = await Nfts.find({ orbID: { $eq: req.params.orbID } });
    console.log(Result);
    console.log(Result[0]._id);
    const updateNft = await Nfts.findByIdAndUpdate(
      Result[0]._id,
      { ownerNull: req.body.ownerNull },
      { returnOriginal: false }
    );
    return res.status(200).json({
      success: true,
      response: "Update Successfully",
      data: updateNft,
    });
  } catch (error) {}
});

module.exports = router;
