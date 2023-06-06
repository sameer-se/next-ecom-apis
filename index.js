const express = require("express");
const users = require("./model/User");
const app = express();
require("./config/database");
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  try {
    let user = await users.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.log(err.massage);
    if (err.name == "ValidationError") {
      res.status(400).send({
        err: err.massage,
        // errors: [
        //   // {
        //   //   params: "name",
        //   //   msg: "required",
        //   // },
        //   // {
        //   //   params: "email",
        //   //   msg: "required",
        //   // },
        //   // {
        //   //   params: "role",
        //   //   msg: "required",
        //   // },
        //   // {
        //   //   params: "password",
        //   //   msg: "required",
        //   // },
        // ],
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
  res.send(user.password11);
});

app.listen(8080, () => {
  console.log("server started");
});
