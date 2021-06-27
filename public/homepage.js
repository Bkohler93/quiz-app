$("#to-quiz-btn").on("click", () => {
  let quizId = $("#quiz-id").val();

  window.location.href = `/quiz?id=${quizId}`;
});

$("#make-quiz-btn").on("click", () => {
  window.location.href = `/create`;
});
