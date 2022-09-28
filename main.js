const express = require("express");
const app = express();

app.route("/").get((req, res) => {
  res.send("hi");
});

app.listen(3000, (err) => {
  console.log("App is listening on 3000");
});
