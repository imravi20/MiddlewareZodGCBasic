//middleware-authentication, zod-input format validation

const express = require("express");
const app = express();
const zod = require("zod"); //1

app.use(express.json());
//middleware

const ipSchema = zod.object({
  //2
  username: zod.string().min(4),
  password: zod.string().min(4),
  kidneyId: zod.number(),
  // kidneyId: zod.literal(1).or(zod.literal(2)),
});

const validation = (ipSchema) => (req, res, next) => {
  //3
  const response = ipSchema.safeParse({
    username: req.headers.username,
    password: req.headers.password,
    kidneyId: Number(req.query.kidneyId),
  });
  if (!response.success) {
    res.status(411).json({
      msg: "invalid input format",
    });
  } else {
    console.log(response);
    next();
  }
};

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

app.get(
  "/",
  validation(ipSchema),
  userValidation,
  kidneyValidation,
  (req, res) => {
    res.send("hi from get");
  }
);

app.post("/", validation(ipSchema), kidneyValidation, (req, res) => {
  res.send("hi from post");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("internal server error");
});

app.listen(3000);
