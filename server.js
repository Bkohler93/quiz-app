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
var numCorrect = 0;

app.get("/", async (req, res) => {
  console.log(`== User accessing homepage`);

  try {
    // const newquiz = new Quiz({
    //   author: "Brett",
    //   numQuestions: 2,
    //   testTakers: [
    //     {
    //       name: "Brett",
    //       score: 2,
    //     },
    //     {
    //       name: "Jenny",
    //       score: 0,
    //     },
    //   ],
    //   title: "Quiz about Sadie",
    //   questions: [
    //     {
    //       question: "Sadie's fav food is..",
    //       answers: ["spaghetti", "sauce", "dog food", "muffins"],
    //       correctAns: 2,
    //      number: 0
    //     },
    //     {
    //       question: "How old is Sadie?",
    //       answers: ["13", "15", "3", "5"],
    //       correctAns: 3,
    //      number; 1,
    //     },
    //   ],
    // });
    // console.log(newquiz instanceof Quiz);
    // newquiz.save();

    const quiz = await Quiz.find(
      {
        _id: "60c7dad9370d67c8589927d1",
      },
      { _id: 0 }
    )
      .select({ _id: 0, "questions.correctAns": 0 })
      .lean();
    var numQuestions = quiz["0"];
    var questions = quiz["0"].questions;

    res.status(200).render("quiz", {
      questions: questions,
    });
  } catch (err) {
    console.log(`Error caught: ${err}`);
  }
});

app.post("/submit", async (req, res) => {
  console.log("== received submission from user");
  try {
    const userAnswers = req.body;
    const quiz = await Quiz.find({
      _id: "60c7dad9370d67c8589927d1",
    }).lean();

    const correctAnswers = {};
    for (let i = 0; i < quiz[0]["questions"].length; i++) {
      correctAnswers[i] = quiz[0]["questions"][i].correctAns;
    }
    for (let ans in correctAnswers) {
      if (correctAnswers[ans] === Number(userAnswers[ans])) numCorrect++;
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
