const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://amol14:tonystark44@pandu.jwnhngs.mongodb.net/mern-pizza";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongo db connection Succesfull`);
});

db.on("error", () => {
  console.log(`Connection to mongoDb Failed!!`);
});

module.exports = mongoose;
