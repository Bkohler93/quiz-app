require("dotenv").config();

const Question = require("./models/question");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
var numCorrect = 0;

app.get("/", async (req, res) => {
  console.log(`== User accessing homepage`);

  try {
    const questions = await Question.find({}).lean();
    questions.sort((a, b) => a.number - b.number);
    res.status(200).render("quiz", {
      questions: questions,
    });
  } catch (err) {
    console.log(`Erro caught: ${err}`);
  }
});

app.post("/submit", async (req, res) => {
  console.log("== received submission from user");
  try {
    const userAnswers = req.body;
    const questions = await Question.find({}).lean();
    questions.sort((a, b) => a.number - b.number);
    for (prop in questions) {
      if (questions[prop]["Ans"] === userAnswers[prop]) numCorrect++;
    }

    res.status(200).send("success");
  } catch (err) {
    console.log(`Error caught ${err}`);
  }
});

app.get("/results", (req, res) => {
  res.status(200).send({ numCorrect });
  numCorrect = 0;
});
app.listen(port, () => {
  console.log(`== Server is listening on port ${port}`);
});
