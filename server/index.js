require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/api", (req, res) => {
  console.log(req.body);
  try {
    fetch(
      `https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    ).then((verifyRes) => {
      verifyRes.json().then((wldResponse) => {
        console.log(wldResponse);
        if (verifyRes.status == 200) {
          res.json({
            code: wldResponse.code,
            detail: wldResponse.detail,
          });
        } else {
          res.json({
            code: wldResponse.code,
            detail: wldResponse.detail,
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
});

const port = 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
