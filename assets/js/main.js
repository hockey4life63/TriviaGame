/*
mainGAmeObj{
	timer
	buildQuestion(questionObj)
	start and end screen
	question answered right
	avg time to answer question
}
questions[]{
	question string
	answers(8)
	correct answer
	answer order shuffle
	times answered wrong/right
	avg time to awnser
}
user starts game
first question appears with a timer
user clicks answer 
	if correct tell user then move to next question;
	else show correct question then to next question
repeats till all questions asked
at end show stats ask to play agian
*/
var orderShuffle = function() {
        this.choices = [];
        let answers = this.answer.slice(0);
        let newChoices = [];
        for (var i = 0; i < 3; i++) {
            let rand = Math.floor(Math.random() * answers.length);
            let item = answers[rand]
            newChoices.push(item);
            answers.splice(rand, 1);
        }
        newChoices.push(this.correctAnswer);
        for (var i = 0; i < 4; i++) {
            let rand = Math.floor(Math.random() * newChoices.length);
            this.choices.push(newChoices[rand]);
            newChoices.splice(rand, 1);
        }

    } //pulls 3 random worong answers and the correct one and places in random order inside choices

function questionObj(question, awnser, correctAnswer) {
    this.question = question;
    this.answer = awnser; //will be array of answers
    this.choices = [];
    this.correctAnswer = correctAnswer;
    this.orderShuffle = orderShuffle;
    this.answeredRight = 0;
    this.asked = 0;
    this.avgTime = [];
}

function questionConstuct() {
    for (var i = 0; i < questionsList.length; i++) {
        let item = new questionObj(questionsList[i][0], questionsList[i][1], questionsList[i][2]);
        game.questions.push(item);
    }
};
var game = {
    timer: {
        start: function() {

        },
        stop: function() {

        },
        timerID: "",
        perQuestion: 15,
        timerCount: this.perQuestion

    },
    startGame: function() {

    },
    buildQuestion: function(question) {

    },
    end: function() {

    },
    timeUp: function() {

    },
    answeredWrong: function(question, answer) {

    },
    answeredRight: function(question, answer) {

    },
    makeQuestionOrder: function() {

    },
    questions: [],
    avgTime: [],
    questionOrder: [],
    asked: 0,
    correct: 0
}
