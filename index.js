require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;


app.get("test-ai", (req, res) => {});

app.get("/", (req, res) => {
  res.send({ msg: "Lets crack The power of Nime!" });
});

app.listen(port, () => {
  console.log(`Nime app listening on port ${port}`);
});
