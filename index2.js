//middleware validation

const express = require("express");
const app = express();
app.use(express.json());

//middleware

function userValidation(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if (username != "Rabi" || password != "pass") {
    res.status(403).json({
      msg: "user does not exist",
    });
  } else {
    next();
  }
}
function kidneyValidation(req, res, next) {
  const kidneyId = req.query.kidneyId;

  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).json({
      msg: "invalid input",
    });
  } else {
    next();
  }
}

app.get("/", userValidation, kidneyValidation, (req, res) => {
  res.send("hi from get");
});

app.post("/", kidneyValidation, (req, res) => {
  res.send("hi from put");
});

app.listen(3000);
