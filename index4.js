//rate limiter, another middleware

const express = require("express");
const rateLimit = require("express-rate-limit"); //1

const limit = rateLimit({
  //2
  windowMs: 7 * 1000,
  max: 5,
  message: "too many request",
});

const app = express();
app.use(express.json());

app.use(limit); //3

//wrapper function

function userValidation(username, password) {
  if (username != "Rabi" || password != "pass") {
    return false;
  }
  return true;
}
function kidneyValidation(kidneyId) {
  if (kidneyId != 1 && kidneyId != 2) {
    return false;
  }
  return true;
}

let noOfClicks = 0;
function calculateClicks(req, res, next) {
  console.log(++noOfClicks);
  next();
}

app.get("/", calculateClicks, (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.query.kidneyId;

  if (userValidation(username, password) == false) {
    res.status(403).json({
      msg: "user does not exist",
    });
  }
  if (kidneyValidation(kidneyId) == false) {
    res.status(411).json({
      msg: "invalid input",
    });
  }
  res.send("hi from get");
});

app.post("/", (req, res) => {
  const kidneyId = req.query.kidneyId;
  if (kidneyValidation(kidneyId) == false) {
    res.status(411).json({
      msg: "invalid input",
    });
  }
  res.send("hi from put");
});

app.listen(3000);
