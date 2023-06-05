const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  author: ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    set: function (value) {
      // console.log("set-value", value);
      // this.role = value.toLowerCase;
      return value.toLowerCase();
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
