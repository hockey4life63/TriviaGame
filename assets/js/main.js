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
const QLOC = "#questionBox";
const ANSCLASS = "panel panel-default col-md-6 answer";
const TIMELOC = "#timeCount";
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
let game = {
    timer: {
        start: function() {
            $(TIMELOC).text(this.timerCount);
            game.timer.timerID = setInterval(function() {
                game.timer.timerCount--;
                $(TIMELOC).text(game.timer.timerCount)
                if (game.timer.timerCount === 0) {
                    game.timer.stop();
                    game.timeUp();
                    game.timer.timerCount = 15;
                };

            }, 1000);

        },
        stop: function() {
            clearInterval(this.timerID)
        },
        timerID: "",
        perQuestion: 15,
        timerCount: 15

    },
    startGame: function() {

    },
    buildQuestion: function(question) {
        $(QLOC).html("");
        let name = $("<h1>");
        name.addClass("col-md-12 question");
        name.text(question.question);
        $(QLOC).append(name);
        question.orderShuffle();
        for (let i = 0; i < question.choices.length; i++) {
            console.log(i)
            let item = $("<div>");
            item.addClass(ANSCLASS);
            item.attr("id", "answer" + i);
            item.append($("<div>").addClass("panel-body").text(question.choices[i]));
            $(QLOC).append(item);
            let curAnswer = question.choices[i];
            $("#answer" + i).on("click", function() {
                game.answeredCheck(question, curAnswer);
            });
        }

    },
    end: function() {

    },
    timeUp: function() {

    },
    answeredCheck: function(question, answer) {
        if (question.correctAnswer === answer) {
            this.correct(question);
        } else {
            this.wrong(question, answer);
        }
    },
    wrong: function(question, answer) {
        console.log("WRONG!!!! you chose " + answer + "correct answer is " + question.correctAnswer);
    },
    correct: function(question) {
        console.log("Correct!");
    },
    makeQuestionOrder: function() {

    },
    questions: [],
    avgTime: [],
    questionOrder: [],
    asked: 0,
    correctAns: 0
}
