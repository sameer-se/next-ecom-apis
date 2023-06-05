const express = require("express");
const users = require("./model/users");
const app = express();
require("./config/database");
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  try {
    let user = await users.create(req.body);
    res.send(user);
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

app.listen(8080, () => {
  console.log("server started");
});
