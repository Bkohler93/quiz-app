document.querySelector(".preload").onload = () => {
  document.body.classList.remove("preload");
};

const prevButton = document.querySelector(".nav-container div:nth-child(1)");
const nextButton = document.querySelector(".nav-container div:nth-child(2)");
const submitButton = document.querySelector(".nav-container div:nth-child(3)");
const questionCard = document.querySelector(".question-card");
const questionNumber = document.querySelector("h3");
const question = document.querySelector("#question");
const ansOne = document.querySelector(".ans:nth-child(1) label");
const ansTwo = document.querySelector(".ans:nth-child(2) label");
const ansThree = document.querySelector(".ans:nth-child(3) label");
const ansFour = document.querySelector(".ans:nth-child(4) label");
const ansContainer = document.querySelector(".ans-container");
const radioAnswers = {
  a: document.querySelector(".ans:nth-child(1) input"),
  b: document.querySelector(".ans:nth-child(2) input"),
  c: document.querySelector(".ans:nth-child(3) input"),
  d: document.querySelector(".ans:nth-child(4) input"),
};

var numCorrectAns = 0;

const questions = [
  {
    question: "Which of the following is not a real eCommerce platform?",
    a: "Shopify",
    b: "WooCommerce",
    c: "ShopCommerce",
    d: "BigCommerce",
    ans: "c",
    ansChecked: false,
  },
  {
    question: "If Shopify is so good, why are Shopify developers necessary?",
    a: "To save time on things like store setups and migrations",
    b: "To extend the limited design options and functionalities of themes with custom code",
    c: "To provide support with a deep understanding of how the platform works and what its limitations are",
    d: "All of the above",
    ans: "d",
    ansChecked: false,
  },
  {
    question: "Which of the following is true about Shopify developers?",
    a: "They are paid extremely well",
    b: "There is a high demand for them",
    c: "They need to know web development, the platform well, and the liquid template language",
    d: "All of the above",
    ans: "d",
    ansChecked: false,
  },
];

var questionIterator = 0;
nextQuestion(questionIterator);
console.log(prevButton);
prevButton.classList.add("hide");

nextButton.addEventListener("click", () => {
  console.log(`== clicked next with iterator at ${questionIterator}`);
  questionIterator++;
  // checkCorrect(questionIterator++);
  if (questionIterator < 3) {
    nextQuestion(questionIterator);
  } else {
    questionIterator = 2;
  }

  prevButton.classList.add("nav-button");
  prevButton.classList.remove("hide");

  if (questionIterator === 2) {
    nextButton.classList.remove("nav-button");
    nextButton.classList.add("hide");
  }
});

prevButton.addEventListener("click", () => {
  if (questionIterator > 0) {
    // checkCorrect(questionIterator);
    nextQuestion(--questionIterator);
  }

  nextButton.classList.add("nav-button");
  nextButton.classList.remove("hide");

  if (questionIterator === 0) {
    prevButton.classList.remove("nav-button");
    prevButton.classList.add("hide");
  }
});

ansContainer.addEventListener("click", (event) => {
  var targetNode = event.target;
  const isRadio =
    targetNode.nodeName === "INPUT" || targetNode.nodeName === "LABEL";
  const question = questions[questionIterator];
  if (!isRadio) {
    return;
  }
  if (targetNode.nodeName === "LABEL") {
    targetNode.previousSibling.previousSibling.checked = true;
    var radioId = targetNode.previousSibling.previousSibling.id;
  } else {
    var radioId = targetNode.id;
  }

  if (radioId !== question.ans && question.ansChecked) {
    numCorrectAns--;
    question.ansChecked = false;
  } else if (radioId === question.ans && !question.ansChecked) {
    numCorrectAns++;
    question.ansChecked = true;
  }
  console.log(`number correct is ${numCorrectAns}`);
});

submitButton.addEventListener("click", () => {
  alert(`You got ${numCorrectAns} questions correct out of 3`);
});

function nextQuestion(questionIterator) {
  const currQuestion = questions[questionIterator];
  questionNumber.textContent = "";
  question.textContent = "";
  ansOne.textContent = "";
  ansTwo.textContent = "";
  ansThree.textContent = "";
  ansFour.textContent = "";

  questionNumber.textContent = `Question ${questionIterator + 1} of 3`;
  question.textContent = `${currQuestion.question}`;
  ansOne.textContent = `${currQuestion.a}`;
  ansTwo.textContent = `${currQuestion.b}`;
  ansThree.textContent = `${currQuestion.c}`;
  ansFour.textContent = `${currQuestion.d}`;
  for (radioAnswer in radioAnswers) {
    radioAnswers[radioAnswer].checked = false;
  }
  if (currQuestion.ansChecked) {
    radioAnswers[currQuestion.ans].checked = true;
  }
}

function checkCorrect(questionIterator) {
  let question = questions[questionIterator];

  if (radioAnswers[question.ans].checked) {
    numCorrectAns++;
    console.log(`== ${numCorrectAns} correct`);
    question.ansChecked = true;
  } else if (question.ansCheck) {
    numCorrectAns--;
    question.ansChecked = false;
  }

  for (radioAnswer in radioAnswers) {
    radioAnswers[radioAnswer].checked = false;
  }
}
