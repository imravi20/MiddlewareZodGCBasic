//normal validation

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.query.kidneyId;

  if (username != "Rabi" || password != "pass") {
    res.status(403).json({
      msg: "user dos not exist",
    });
    return;
  }
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).json({
      msg: "invalid input",
    });
    return;
  }

  res.send("hi");
});

app.listen(3000);
