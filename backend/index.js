require("dotenv").config();
console.log("viso gero");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/routes");

const corsOptions = {
  allowedHeaders: ["eventauth", "Content-Type"],
  exposedHeaders: ["eventauth"],
};

mongoose.connect("mongodb://localhost/EventDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Logged into database"));

const app = express();
app.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);

app.listen(3000);
