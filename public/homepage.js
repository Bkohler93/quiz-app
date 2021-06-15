$("#to-quiz-btn").on("click", () => {
  let quizId = $("#quiz-id").val();

  window.location.href = `/quiz?id=${quizId}`;
});
