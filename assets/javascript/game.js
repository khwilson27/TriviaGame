$(document).ready(function() {

        // define variables eg. counters
        var correctCounter = 0;
        var incorrectCounter = 0;
        var unansweredCounter = 0;
        var questionCounter= 0;

        // function for countdown timer
        var stopwatch = {
                                  intervalId: "",
                                  time: 16,

                                  reset: function() {
                                    stopwatch.time = 16;
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

        // array with list of questions
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
        
        // array with list of correct answers
        var answers = [ "Budweiser", "Heineken", "Old Milwaukee", "Heineken", "Pabst's", "Carlsberg", "Munich, Germany", "Steigl", "Mannekin Pis", "Guinness" ];
        
        // array with image url of correct answers
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

        // array with incorrect answers
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

        // function that empties the text and image
        var emptyText = function() {
            $(".restart").empty();
            $(".directions").empty();
            $(".timeAvailable").empty();
            $(".question").empty();
            $(".answerOptions").empty();
            $(".imageArea").empty();
        }

        // function that shuffles an array that contains the correct answer and the incorrect answers
        var shuffle = function (a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        }

        // function that shows the current question and answer choices
        var showQuestion = function() {

            // start and count the timer
            stopwatch.start();
            stopwatch.count();

            // create an array with the correct answer and the 2 incorrect answers and shuffle them
            var answerOptions = [answers[questionCounter], wrongAnswers[questionCounter][0], wrongAnswers[questionCounter][1]];
            shuffle(answerOptions);

            var letters = ["A. ", "B. ", "C. "];

            // display question on page
            $(".question").text(questions[questionCounter]);

            // depending on the current questionCounter, display the correct question and appropriate answer choices
            for (var j = 0; j<answerOptions.length; j++) {
                var answerListItem = $("<h3>").text(letters[j] + answerOptions[j]);

                // apply class as "correctAnswer" and "incorrectAnswer" as appropriate and display on page
                if (answerOptions[j] == answers[questionCounter]) {
                    answerListItem.addClass("correctAnswer");
                } else {
                    answerListItem.addClass("incorrectAnswer");
                }

                $(".answerOptions").append(answerListItem);
            }
        }

        // function used when an answer is chosen/unanswered; shows answer and image and continues based on progress
        var endOfQuestion = function(text) {
                $("h3").removeClass();
                stopwatch.stop();
                stopwatch.reset();

                $(".answerOptions").append(text);

                var newImage = $("<img>").attr("src", answerImages[questionCounter]);
                $(".imageArea").append(newImage);

                questionCounter++;

                if (questionCounter < questions.length) {
                    setTimeout(emptyText, 2700);
                    setTimeout(showQuestion, 3000);
                } else {
                    setTimeout(emptyText, 1700);
                    setTimeout(showEndScore, 2000);
                }
        }

        // function when no answer is chosen when timer runs out
        var pickNoAnswer = function() {
            if (stopwatch.time == 0) {

                unansweredCounter++;
                var text = $("<h2>").text("No more time! The answer is " + answers[questionCounter] + "!");

                endOfQuestion(text);
            }
        }

        // function when the correct answer is chosen
        var pickCorrectAnswer = function() {

            correctCounter++;
            var text = $("<h2>").text("Correct! The answer is " + answers[questionCounter] + "!");

            endOfQuestion(text);

        }

        // function when incorrect answer is chosen
        var pickIncorrectAnswer = function() {

            incorrectCounter++;
            var text = $("<h2>").text("Incorrect! The answer is " + answers[questionCounter] + "!");

            endOfQuestion(text);
        }

        // displays the end score and allows player to play again
        var showEndScore = function() {
                var score1 = $("<h1>").text("Correct Answers: " + correctCounter);
                var score2 = $("<h1>").text("Incorrect Answers: " + incorrectCounter);
                var score3 = $("<h1>").text("Unanswered Questions: " + unansweredCounter);
                var playAgain = $("<h3>").text("CLICK HERE TO PLAY AGAIN!").addClass("restart");

                var newImage = $("<img>").attr("src", "assets/images/beerTitle.jpg").addClass("restart");
                $(".imageArea").append(newImage);

                $(".question").append(score1);
                $(".question").append(score2);
                $(".question").append(score3);
                $(".question").append(playAgain);
        }

        // resets the game
        var restartGame = function() {
            $(this).remove();
            emptyText();

            correctCounter = 0;
            incorrectCounter = 0;
            unansweredCounter = 0;
            questionCounter= 0;

            showQuestion();
        }

        // on click event functions
        $(".textDiv").on("click", ".correctAnswer", pickCorrectAnswer);
        $(".textDiv").on("click", ".incorrectAnswer", pickIncorrectAnswer); 
        $(".textDiv").on("click", ".restart", restartGame);   

}) //closing document.ready