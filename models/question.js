const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const questionSchema = new Schema(
//   {
//     number: {
//       type: Number,
//       required: true,
//     },
//     text: {
//       type: String,
//       required: true,
//     },
//     A: {
//       type: String,
//       required: true,
//     },
//     B: {
//       type: String,
//       required: true,
//     },
//     C: {
//       type: String,
//       required: true,
//     },
//     D: {
//       type: String,
//       required: true,
//     },
//     Ans: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
    correctAns: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const testTakerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const quizSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    numQuestions: {
      type: Number,
      required: true,
    },
    testTakers: {
      type: [testTakerSchema],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  { collection: "quizzes" },
  { timestamps: true }
);
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
