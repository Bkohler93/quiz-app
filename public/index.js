// document.querySelector(".preload").onload = () => {
//   document.body.classList.remove("preload");
// };

// const prevButton = document.querySelector(".nav-container div:nth-child(1)");
// const nextButton = document.querySelector(".nav-container div:nth-child(2)");
// const submitButton = document.querySelector(".nav-container div:nth-child(3)");
// const questionCard = document.querySelector(".question-card");
// const questionNumber = document.querySelector("h3");
// const question = document.querySelector("#question");
// const ansOne = document.querySelector(".ans:nth-child(1) label");
// const ansTwo = document.querySelector(".ans:nth-child(2) label");
// const ansThree = document.querySelector(".ans:nth-child(3) label");
// const ansFour = document.querySelector(".ans:nth-child(4) label");
// const ansContainer = document.querySelector(".ans-container");
// const radioAnswers = {
//   a: document.querySelector(".ans:nth-child(1) input"),
//   b: document.querySelector(".ans:nth-child(2) input"),
//   c: document.querySelector(".ans:nth-child(3) input"),
//   d: document.querySelector(".ans:nth-child(4) input"),
// };

// var questionIterator = 0;
// nextQuestion(questionIterator);
// prevButton.classList.add("hide");

// nextButton.addEventListener("mousedown", () => {
//   nextButton.classList.add("nav-clicked");
// });

// nextButton.addEventListener("mouseup", () => {
//   questionIterator++;
//   // checkCorrect(questionIterator++);
//   if (questionIterator < 3) {
//     nextQuestion(questionIterator);
//   } else {
//     questionIterator = 2;
//   }

//   nextButton.classList.remove("nav-clicked");
//   prevButton.classList.add("nav-button");
//   prevButton.classList.remove("hide");

//   if (questionIterator === 2) {
//     nextButton.classList.remove("nav-button");
//     nextButton.classList.add("hide");
//   }
// });

// prevButton.addEventListener("mousedown", () => {
//   prevButton.classList.add("nav-clicked");
// });

// prevButton.addEventListener("mouseup", () => {
//   if (questionIterator > 0) {
//     // checkCorrect(questionIterator);
//     nextQuestion(--questionIterator);
//   }
//   nextButton.classList.add("nav-button");
//   nextButton.classList.remove("hide");

//   if (questionIterator === 0) {
//     prevButton.classList.remove("nav-button");
//     prevButton.classList.add("hide");
//   }
//   prevButton.classList.remove("nav-clicked");
// });

// prevButton.addEventListener("mouseleave", () => {
//   prevButton.classList.remove("nav-clicked");
// });

// nextButton.addEventListener("mouseleave", () => {
//   nextButton.classList.remove("nav-clicked");
// });

// ansContainer.addEventListener("click", (event) => {
//   var targetNode = event.target;
//   const isRadio =
//     targetNode.nodeName === "INPUT" || targetNode.nodeName === "LABEL";
//   // const question = questions[questionIterator];
//   if (!isRadio) {
//     return;
//   }
//   if (targetNode.nodeName === "LABEL") {
//     targetNode.previousSibling.previousSibling.checked = true;
//     var radioId = targetNode.previousSibling.previousSibling.id;
//   } else {
//     var radioId = targetNode.id;
//   }

//   if (radioId !== question.ans && question.ansChecked) {
//     numCorrectAns--;
//     question.ansChecked = false;
//   } else if (radioId === question.ans && !question.ansChecked) {
//     numCorrectAns++;
//     question.ansChecked = true;
//   }
// });

// submitButton.addEventListener("mouseup", () => {
//   alert(`You got ${numCorrectAns} questions correct out of 3`);
// });

// submitButton.addEventListener("mousedown", () => {
//   submitButton.classList.add("nav-clicked");
// });

// submitButton.addEventListener("mouseleave", () => {
//   submitButton.classList.remove("nav-clicked");
// });

//display only first question
const questions = $(".question-card");
const ansRadio = {
  A: $(".a"),
  B: $(".b"),
  C: $(".c"),
  D: $(".d"),
};

questions.first().removeClass("hidden");

var questionIterator = 0;
const numQuestions = questions.length;
var userAnswers = {};

//record answers
ansRadio["A"].on("click", () => (userAnswers[questionIterator] = "A"));
ansRadio["B"].on("click", () => (userAnswers[questionIterator] = "B"));
ansRadio["C"].on("click", () => (userAnswers[questionIterator] = "C"));
ansRadio["D"].on("click", () => (userAnswers[questionIterator] = "D"));

//go to next question
$("#next")
  .on("click", () => {
    $("#prev").removeClass("hide-btn");

    if (questionIterator === numQuestions - 1) {
      $("#next").addClass("hide-btn");
    }
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
  })
  .on("mousedown", () => $("#next").addClass("nav-clicked"))
  .on("mouseup", () => {
    $("#next").removeClass("nav-clicked");
    console.log("mouse left");
  });

$("#prev")
  .on("click", () => {
    $("#next").removeClass("hide-btn");

    if (questionIterator === 0) {
      $("#prev").addClass("hide-btn");
    }
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
  })
  .on("mousedown", () => $("#prev").addClass("nav-clicked"))
  .on("mouseup", () => {
    $("#prev").removeClass("nav-clicked");
  });

$("#submit").on("click", async () => {
  try {
    var request = await $.ajax({
      url: "/submit",
      type: "POST",
      data: userAnswers,
      success: (results) => {
        console.log("results submitted");
      },
    });

    var newData = await $.ajax({
      url: "/results",
      type: "GET",
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
