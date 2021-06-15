//display only first question
const questions = $(".question-card");

// const ansRadio = $(".ansRadio");
const ansRadio = {
  0: $(".ans:nth-child(1) > .ansRadio"),
  1: $(".ans:nth-child(2) > .ansRadio"),
  2: $(".ans:nth-child(3) > .ansRadio"),
  3: $(".ans:nth-child(4) > .ansRadio"),
};

// console.log(ansRadio[0]);
console.log("========");
console.log(ansRadio);
questions.first().removeClass("hidden");

var questionIterator = 0;
const numQuestions = questions.length;
var userAnswers = {};

// console.log($(".ans-container"));
//record answers
ansRadio["0"].on("click", () => (userAnswers[questionIterator] = "0"));
ansRadio["1"].on("click", () => (userAnswers[questionIterator] = "1"));
ansRadio["2"].on("click", () => (userAnswers[questionIterator] = "2"));
ansRadio["3"].on("click", () => (userAnswers[questionIterator] = "3"));

//go to next question
$("#next").on("click", () => {
  console.log(`current answers are:`);
  console.log(userAnswers);
  $("#prev").removeClass("hide-btn");

  if (questionIterator < numQuestions - 1) {
    questions[questionIterator].classList.add("hidden");
    questionIterator++;
    questions[questionIterator].classList.remove("hidden");
    if (userAnswers[questionIterator]) {
      ansRadio[userAnswers[questionIterator]]
        .eq(questionIterator)
        .prop("checked", true);
    }
  }
  if (questionIterator === numQuestions - 1) {
    $("#next").addClass("hide-btn");
  }
});

$("#prev").on("click", () => {
  $("#next").removeClass("hide-btn");

  if (questionIterator > 0) {
    questions[questionIterator].classList.add("hidden");
    questionIterator--;
    questions[questionIterator].classList.remove("hidden");
    if (userAnswers[questionIterator]) {
      ansRadio[userAnswers[questionIterator]]
        .eq(questionIterator)
        .prop("checked", true);
    }
  }
  if (questionIterator === 0) {
    $("#prev").addClass("hide-btn");
  }
});

$("#submit").on("click", async () => {
  try {
    var request = await $.ajax({
      url: "/submit",
      type: "POST",
      data: userAnswers,
      success: (results) => {
        let resultsDiv = document.createElement("div");
        resultsDiv.classList.add("answers");
        resultsDiv.textContent =
          "You scored " + results.numCorrect + " correct.";
        console.log(results);
        questions[questionIterator].classList.add("hidden");
        $(".nav-container").addClass("hidden");
        $(".container").append(resultsDiv);
      },
    });
  } catch (err) {
    console.log(`error caught: ${err}`);
  }
});

$(".nav-button")
  .on("mousedown", (event) => event.target.classList.add("nav-clicked"))
  .on("mouseup", (event) => event.target.classList.remove("nav-clicked"))
  .on("mouseleave", (event) => event.target.classList.remove("nav-clicked"));
