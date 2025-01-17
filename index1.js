//wrapper function for validation

const express = require("express");
const app = express();
app.use(express.json());

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

app.get("/", (req, res) => {
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
