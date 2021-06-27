$("#add-quest-btn").on("click", () => {
  var questionContext = {
    number: 0,
    question: "none",
    answers: ["billy", "bob", "fred", "wilma"],
  };
  console.log(Handlebars.templates);
  var questionHtml = Handlebars.templates.questionCard(questionContext);
  //   console.log(questionHtml);
});
