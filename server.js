require("dotenv").config();

const Quiz = require("./models/question");
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

app.get("/", (req, res) => {
  res.status(200).render("homePage");
});

app.get("/quiz", async (req, res, next) => {
  console.log(`== User accessing homepage`);

  let id = req.query.id;

  // req.setTimeout(5000, () => {
  //   res.status(404).send("page does not exist");
  //   res.end();
  // });

  try {
    //60c7dad9370d67c8589927d1
    const quiz = await Quiz.find({
      _id: id,
    })
      .select({ "questions.correctAns": 0 })
      .lean();
    var numQuestions = quiz["0"];
    var title = quiz["0"].title;
    var questions = quiz["0"].questions;

    res.status(200).render("quiz", {
      questions: questions,
      title: title,
    });
  } catch (err) {
    console.log(`Error caught: ${err}`);
    res.status(404).render("404Page");
  }
});

app.post("/submit", async (req, res) => {
  console.log("== received submission from user");
  try {
    const userAnswers = req.body;
    const quiz = await Quiz.find({
      _id: "60c7dad9370d67c8589927d1",
    }).lean();

    var numCorrect = 0;
    var correctAnswers = {};
    for (let i = 0; i < quiz[0]["questions"].length; i++) {
      correctAnswers[i] = quiz[0]["questions"][i].correctAns;
    }
    for (let ans in correctAnswers) {
      if (correctAnswers[ans] === Number(userAnswers[ans])) numCorrect++;
    }
    res.status(200).send({ numCorrect });
  } catch (err) {
    console.log(`Error caught ${err}`);
  }
});

app.listen(port, () => {
  console.log(`== Server is listening on port ${port}`);
});
