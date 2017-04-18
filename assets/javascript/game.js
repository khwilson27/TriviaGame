$(document).ready(function() {

        var correctCounter = 0;
        var incorrectCounter = 0;
        var unansweredCounter = 0;
        var questionCounter= 0;

        var stopwatch = {
                                  intervalId: "",
                                  time: 15,

                                  reset: function() {
                                    stopwatch.time = 15;
                                    stopwatch.stop();
                                  },

                                  start: function() {
                                    stopwatch.intervalId = setInterval(stopwatch.count, 1000);
                                  },

                                  stop: function() {
                                    clearInterval(stopwatch.intervalId);
                                  },

                                  count: function() {
                                    stopwatch.time--;
                                    $(".timeAvailable").text("Time Remaining: " + stopwatch.time);

                                    if (stopwatch.time == 0) {
                                      stopwatch.stop();
                                      pickNoAnswer();
                                    }
                                  },
                        };

        var questions = [ "1. This beer used croaking frogs in their advertisement. What beer is it?",
                              "2. This beer, though often thought to be German, is actually Dutch. What beer is it?",
                              "3. What beer has the slogan 'It can't get any better than this.'?",
                              "4. What beer uses the 'communist star' on their label?",
                              "5. What beer incorporated their often won award as the central graphic of their label?",
                              "6. 'Probably the best beer in the world,' or so the slogan says. Who is it?",
                              "7. Where is the largest beer festival in the world held every year?",
                              "8. This beer was created in the same year that 'Columbus sailed the ocean blue.' What is it?",
                              "9. What beer is banned in the United States because it has a naked little boy on the label?",
                              "10. In some bars in the world, which beer is supposed to be poured in a certain way with a shamrock in the head after it settles?" ];
           
        var answers = [ "Budweiser", "Heineken", "Old Milwaukee", "Heineken", "Pabst's", "Carlsberg", "Munich, Germany", "Steigl", "Mannekin Pis", "Guinness" ];
        var answerImages = [ "assets/images/answer1.jpg",
                             "assets/images/answer2.jpg",
                             "assets/images/answer3.jpg",
                             "assets/images/answer4.jpg",
                             "assets/images/answer5.jpg",
                             "assets/images/answer6.jpg",
                             "assets/images/answer7.jpg",
                             "assets/images/answer8.jpg",
                             "assets/images/answer9.jpg",
                             "assets/images/answer10.jpg" ];

        var wrongAnswers = [ ["Coors", "Samuel Adams"],
                             ["Beck's", "Erdinger"],
                             ["Schmidt", "Labatt Blue"],
                             ["Coors", "Budweiser"],
                             ["Coors", "Budweiser"],
                             ["Corona", "Heineken"],
                             ["Pilsen, Czech Republic", "Dublin, Ireland"],
                             ["Schofferhofer", "Samuel Adams"],
                             ["Blue Moon", "Brugse Straffe Hendrik"],
                             ["Murphy's", "O'Hara's"] ];

        var emptyText = function() {
            $(".directions").empty();
            $(".timeAvailable").empty();
            $(".question").empty();
            $(".answerOptions").empty();
        }

        var shuffle = function (a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        }

        var showQuestion = function() {
            stopwatch.start();
            stopwatch.count();

            var answerOptions = [answers[questionCounter], wrongAnswers[questionCounter][0], wrongAnswers[questionCounter][1]];
            shuffle(answerOptions);

            var letters = ["A. ", "B. ", "C. "];

            $(".question").text(questions[questionCounter]);

            for (var j = 0; j<answerOptions.length; j++) {
                var answerListItem = $("<h3>").text(letters[j] + answerOptions[j]);

                if (answerOptions[j] == answers[questionCounter]) {
                    answerListItem.addClass("correctAnswer");
                } else {
                    answerListItem.addClass("incorrectAnswer");
                }

                $(".answerOptions").append(answerListItem);
            }
        }

        var pickNoAnswer = function() {
            if (stopwatch.time == 0) {
                $("h3").removeClass();
                stopwatch.stop();
                stopwatch.reset();
                unansweredCounter++;
                var text = $("<h3>").text("No more time! The answer is " + answers[questionCounter] + "!");
                $(".answerOptions").append(text);
                $(".answerImage").attr("src", answerImages[questionCounter]);

                questionCounter++;

                if (questionCounter < questions.length) {
                    setTimeout(emptyText, 2700);
                    setTimeout(showQuestion, 3000);
                } else {
                    emptyText();
                    showEndScore();
                }
            }
        }

        var pickCorrectAnswer = function() {
            $("h3").removeClass();
            stopwatch.stop();
            stopwatch.reset();
            correctCounter++;
            var text = $("<h3>").text("Correct! The answer is " + answers[questionCounter] + "!");
            $(".answerOptions").append(text);
            $(".answerImage").attr("src", answerImages[questionCounter]);

            questionCounter++;

            if (questionCounter < questions.length) {
                setTimeout(emptyText, 2700);
                setTimeout(showQuestion, 3000);
            } else {
                emptyText();
                showEndScore();
            }

        }

        var pickIncorrectAnswer = function() {
            $("h3").removeClass();
            stopwatch.stop();
            stopwatch.reset();
            incorrectCounter++;
            var text = $("<h3>").text("Incorrect! The answer is " + answers[questionCounter] + "!");
            $(".answerOptions").append(text);
            $(".answerImage").attr("src", answerImages[questionCounter]);

            questionCounter++;

            if (questionCounter < questions.length) {
                setTimeout(emptyText, 2700);
                setTimeout(showQuestion, 3000);
            } else {
                emptyText();
                showEndScore();
            }
        }

        var showEndScore = function() {
                var score1 = $("<h3>").text("Correct Answers: " + correctCounter);
                var score2 = $("<h3>").text("Incorrect Answers: " + incorrectCounter);
                var score3 = $("<h3>").text("Unanswered Questions: " + unansweredCounter);
                var playAgain = $("<h3>").text("CLICK HERE TO PLAY AGAIN!").addClass("restart");

                $(".question").append(score1);
                $(".question").append(score2);
                $(".question").append(score3);
                $(".question").append(playAgain);
        }

        var restartGame = function() {
            $(this).remove();

            correctCounter = 0;
            incorrectCounter = 0;
            unansweredCounter = 0;
            questionCounter= 0;

            showQuestion();
        }

        var startGame = function() {
            $(this).remove();
            showQuestion(questionCounter);
        } 

        $(".directions").on("click", startGame);
        $(document).on("click", ".correctAnswer", pickCorrectAnswer);
        $(document).on("click", ".incorrectAnswer", pickIncorrectAnswer); 
        $(document).on("click", ".restart", restartGame);   

}) //closing document.ready