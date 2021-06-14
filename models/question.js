const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    A: {
      type: String,
      required: true,
    },
    B: {
      type: String,
      required: true,
    },
    C: {
      type: String,
      required: true,
    },
    D: {
      type: String,
      required: true,
    },
    Ans: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
