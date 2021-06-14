# quiz-app

This app will let users create or take quizzes made by others.

Uses Node/Express/Mongoose/Handlebars.

## Important

Requires a '.env' file with a valid MongoDB URI.

Example: <code>MONGODB_URI=mongodb+srv://[MongoAtlasAccount]:[password]@[cluster].mongodb.net/[DatabaseName]?retryWrites=true&w=majority</code>

This will create a collection called "questions" inside the database passed into [DatabaseName] above.
<br><br>
As of now this app only supports questions already stored in a collection. Users can answer the questions and then hit submit to see their score on the current quiz.
Documents in the collection must be formatted as:
<code>number:1,
text: 'Question text goes here',
A: 'answerA',
B: 'answerB',
C: 'answerC',
D: 'answerD',
Ans: '[correctLetterAnswer]B'</code>
