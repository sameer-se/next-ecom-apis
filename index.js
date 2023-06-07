const express = require("express");
const users = require("./model/User");
const app = express();
require("./config/database");
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  try {
    let user = await users.create(req.body);
    res.status(200).send(user);
    console.log(user);
    bcrypt.hash(req.body.passsword, 10, function (err, hash) {
      // Store hash in your password DB.
      // 10 is saltround for hash times in passwords
    });
  } catch (err) {
    console.log(err.massage);
    if (err.name == "ValidationError") {
      res.status(400).send({
        err: err.massage,
      });
    } else {
      res.status(500).send({
        err: "SERVER ERROR",
      });
    }
  }
});

app.post("/api/getusers", async (req, res) => {
  let user = await users.findOne({
    email: req.body.email,
  });
  res.send(user.password);
});

app.listen(8080, () => {
  console.log("server started");
});
