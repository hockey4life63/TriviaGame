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
const QLOC = "#questionBox"; //main location for all 
const ANSCLASS = "panel panel-default col-md-6 answer col-xs-12"; //basic class for the awnsers
const NXTQ = 5; //time between qustions
let orderShuffle = function() {
        this.choices = [];
        let answers = this.answer.slice(0);
        let newChoices = [];
        for (let i = 0; i < 3; i++) {
            let rand = Math.floor(Math.random() * answers.length);
            let item = answers[rand]
            newChoices.push(item);
            answers.splice(rand, 1);
        }
        newChoices.push(this.correctAnswer);
        for (let i = 0; i < 4; i++) {
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
}

function questionConstuct() {
    for (let i = 0; i < questionsList.length; i++) {
        let item = new questionObj(questionsList[i][0], questionsList[i][1], questionsList[i][2]);
        game.questions.push(item);
    }

};
let game = {
    timer: {
        start: function(time, loc) {
            this.stop();
            let timeCount = time;
            $(loc).text(timeCount);
            game.timer.timerID = setInterval(function() {
                timeCount--;
                $(loc).text(timeCount);
                if (timeCount === 0) {
                    game.timer.stop();
                    if (loc !== "#nextCountdown") {
                        $("#mainBox").addClass("shrink");
                        setTimeout(function() {
                            $("#mainBox").removeClass("shrink");
                            game.timeUp();
                        }, 1000)
                    }

                };

            }, 1000);

        },
        stop: function() {
            clearInterval(this.timerID)
        },
        timerID: "",
        perQuestion: 15

    }, // all off the timer functions
    startGame: function() {
        this.makeQuestionOrder();
        let item = $("<div>");

        item.append($("<h1>").text("Welcome to my code triva game"));
        item.append($("<h2>").text("You will be asked " + this.questions.length + " questions"));
        item.append($("<h2>").text("You will have " + this.timer.perQuestion + " seconds to answer"));
        item.append($("<h2>").text("The next question will appear after " + NXTQ + " seconds following a answer"));
        item.append($("<button>").text("Start Game").attr("id", "startBtn"));
        $(QLOC).append(item);
        $("#startBtn").on("click", function() {
            $("#mainBox").addClass("shrink");
            setTimeout(function() {
                $("#mainBox").removeClass("shrink");
                game.buildQuestion(game.questions[game.questionOrder[game.questionCount]]);
            }, 1000)
        });

    }, //builds a start screen with info based on some varabiles and sets up the start button
    buildQuestion: function(question) {
        if (this.questionCount == this.questions.length) {
            this.end();
            return;
        } //if asked all questions cal gameEnd and return
        $(QLOC).html("");
        let name = $("<h1>");
        name.addClass("col-md-12 question");
        name.text(question.question);
        $(QLOC).append(name);
        question.orderShuffle();
        for (let i = 0; i < question.choices.length; i++) {
            let item = $("<div>");
            item.addClass(ANSCLASS);
            item.attr("id", "answer" + i);
            item.append($("<div>").addClass("panel-body").text(question.choices[i]));
            $(QLOC).append(item);
            let curAnswer = question.choices[i];
            $("#answer" + i).on("click", function() {
                game.answeredCheck(question, curAnswer);
            });
        } //builds all the answers
        this.questionCount++;
        this.askedQue++
            this.timer.start(this.timer.perQuestion, "#timeCount"); //starts the timer

    },
    end: function() {
        $(QLOC).html("");
        let item = $("<div>");
        item.append($("<h1>").text("Game Over"));
        item.append($("<h2>").text("You got asked a total of " + this.askedQue + " questions"));
        item.append($("<h2>").text("and got " + this.correctAns + " correct"));
        item.append($("<h2>").text("Thats " + Math.floor((this.correctAns / this.askedQue) * 100) + "% answered correctly"));
        item.append($("<button>").text("Start Game").attr("id", "startBtn"));
        this.makeQuestionOrder();
        this.questionCount = 0;
        this.correctAns = 0;
        this.askedQue = 0;
        $(QLOC).append(item);
        $("#startBtn").on("click", function() {
            $("#mainBox").addClass("shrink");
            setTimeout(function() {
                $("#mainBox").removeClass("shrink");
                game.buildQuestion(game.questions[game.questionOrder[game.questionCount]]);
            }, 1000)
        });

    },
    timeUp: function() {
        $(QLOC).html("");
        let item = $("<div>");
        item.append($("<h1>").text("You ran out of time!"));
        item.append($("<h2>").text("You gotta be faster!"));
        item.append($("<h2>").html("Next question will appear in <span id ='nextCountdown'>10</span> seconds"));
        $(QLOC).append(item);
        this.timer.start(NXTQ, "#nextCountdown");
        setTimeout(function() {

            $("#mainBox").addClass("shrink");
            setTimeout(function() {
                $("#mainBox").removeClass("shrink");
                game.buildQuestion(game.questions[game.questionOrder[game.questionCount]]);
            }, 1000)
        }, NXTQ * 1000)

    }, //if called if you run out of time on a question
    answeredCheck: function(question, answer) {
        this.timer.stop();
        $("#mainBox").addClass("shrink");
        setTimeout(function() {
            $("#mainBox").removeClass("shrink")
        }, 1000)
        setTimeout(function() {
            if (question.correctAnswer === answer) {
                game.correct(question);
            } else {
                game.wrong(question, answer);
            }
        }, 1000)
    }, //preforms a check on your answer vs correct answer
    wrong: function(question, answer) {
        $(QLOC).html("");
        let item = $("<div>");
        item.append($("<h1>").text("Sorry thats the wrong answer"));
        item.append($("<h2>").text("You chose " + answer));
        item.append($("<h2>").text("THe correct answer is " + question.correctAnswer));
        item.append($("<h2>").html("Next question will appear in <span id ='nextCountdown'>10</span> seconds"));
        $(QLOC).append(item);
        this.timer.start(NXTQ, "#nextCountdown");
        setTimeout(function() {
            $("#mainBox").addClass("shrink");
            setTimeout(function() {
                $("#mainBox").removeClass("shrink");
                game.buildQuestion(game.questions[game.questionOrder[game.questionCount]]);
            }, 1000)
        }, NXTQ * 1000)
    }, //called if you answer wrong
    correct: function(question) {
        $(QLOC).html("");
        this.correctAns++;
        let item = $("<div>");

        item.append($("<h1>").text("Thats Correct!!!"));
        item.append($("<h2>").html("Next question will appear in <span id ='nextCountdown'>10</span> seconds"));
        $(QLOC).append(item);
        this.timer.start(NXTQ, "#nextCountdown");
        setTimeout(function() {
            $("#mainBox").addClass("shrink");
            setTimeout(function() {
                $("#mainBox").removeClass("shrink");
                game.buildQuestion(game.questions[game.questionOrder[game.questionCount]]);
            }, 1000)
        }, NXTQ * 1000)
    }, //called if you answer corect
    makeQuestionOrder: function() {
        this.questionOrder = [];
        let qList = [];
        for (var i = 0; i < this.questions.length; i++) {
            qList.push(i)
        }
        let listLength = qList.length;
        for (var i = 0; i < listLength; i++) {
            let rand = Math.floor(Math.random() * qList.length);
            this.questionOrder.push(qList[rand]);
            qList.splice(rand, 1);

        }

    }, //makes a random order to call the questions
    questions: [],
    questionOrder: [],
    questionCount: 0,
    askedQue: 0,
    correctAns: 0
}
questionConstuct();
game.startGame();
