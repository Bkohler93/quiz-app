require("dotenv").config();

const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
var app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("== MongoDB is connected.");
});

const port = process.env.PORT || 5022;

app.get("/", (req, res) => {
  console.log(`== User accessing homepage`);
  res.status(200).render("quiz");
});

app.listen(port, () => {
  console.log(`== Server is listening on port ${port}`);
});
