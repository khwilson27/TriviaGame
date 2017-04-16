$(document).ready(function() {

  $(".textDiv").on("click", function() {

        var correctCounter = 0;
        var incorrectCounter = 0;
        var unansweredCounter = 0;

        var stopwatch = {
                                  intervalId: "",
                                  time: 15,

                                  reset: function() {
                                    stopwatch.time = 30;
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
                                  },
                        };

        var questions = [ "This beer used croaking frogs in their advertisement. What beer is it?",
                              "This beer, though often thought to be German, is actually Dutch. What beer is it?",
                              "What beer has the slogan 'It can't get any better than this.'?",
                              "What beer uses the 'communist star' on their label?",
                              "What beer incorporated their often won award as the central graphic of their label?",
                              "'Probably the best beer in the world,' or so the slogan says. Who is it?",
                              "Where is the largest beer festival in the world held every year?",
                              "This beer was created in the same year that 'Columbus sailed the ocean blue.' What is it?",
                              "What beer is banned in the United States because it has a naked little boy on the label?",
                              "In some bars in the world, which beer is supposed to be poured in a certain way with a shamrock in the head after it settles?" ];
           
        var answers = [ "Budweiser", "Heineken", "Old Milwaukee", "Heineken", "Pabst's", "Carlsberg", "Munich, Germany", "Steigl", "Mannekin Pis", "Guinness" ];
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
            $(".imageArea").empty();
        }

        var showQuestion = function() {


        }                    

  }) //closing the .textDiv onClick
}) //closing document.ready

