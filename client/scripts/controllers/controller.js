//////////////////VARIABLES

var vataCount = 0,
    pittaCount = 0,
    kaphaCount = 0,
    userDoshaResults = {},
    userHistory;


////////////////primary dosha app controller -- controls Welcome page
doshApp.controller('DoshaController', ['$scope', '$location', function($scope, $location){

    $scope.testing = "we're up!";

    //change route function
    $scope.changeRoute = function(route){
        $location.path(route);
    };

}]);

///////////////results controller controls Results & History pages
doshApp.controller('ResultsController', ['$scope', '$http', function($scope, $http){

    //recapturing global variable data from quiz results
    $scope.vataCount = vataCount;
    $scope.pittaCount = pittaCount;
    $scope.kaphaCount = kaphaCount;

    //function to make database call
    $scope.getData = function(){
        $http.get('/getData').then(function(response){
            if(response.status !== 200){
                throw new Error("failed to retrieve data from server");
            }
            $scope.userHistory = response.data;
            console.log("this is scope.history: ", $scope.userHistory);
        });
    };

    $scope.getData();

}]);

///////////////dosha quiz controller controls Quiz page
doshApp.controller('QuizController', ['$scope', '$location', '$http', function($scope, $location, $http){

    //resetting dosha quiz variables
    vataCount = 0;
    pittaCount = 0;
    kaphaCount = 0;

    //dosha quiz question data "schema"
    //questions from David Frawley's "Yoga & Ayurveda"
    //move to mongoDB after that is set up/connected
    $scope.questions = [
        {
            question: 'faith',
            answer: {
                vata: 'variable, erratic',
                pitta: 'strong, determined',
                kapha: 'steady, slow to change'
            },
            show: true
        },
        {
            question: 'faith2',
            answer: {
                vata: 'variable, erratic',
                pitta: 'strong, determined',
                kapha: 'steady, slow to change'
            },
            show: false
        }
    ];
    /////////////////QUESTIONS DATA ARRAY END//////////////

    //variable to count and move through question slides
    $scope.slideCounter = 0;

    //change route function
    $scope.changeRoute = function(route){
        $location.path(route);
    };

    //variable counters for each dosha, with functions to save each click to global variables
    $scope.vataBtnCounter = function(){
        vataCount += 1;
        $scope.quizResult();
        $scope.nextQuestion();
        $scope.slideCounter += 1;
    };
    $scope.pittaBtnCounter = function(){
        pittaCount += 1;
        $scope.quizResult();
        $scope.nextQuestion();
        $scope.slideCounter += 1;
    };
    $scope.kaphaBtnCounter = function(){
        kaphaCount += 1;
        $scope.quizResult();
        $scope.nextQuestion();
        $scope.slideCounter += 1;
    };

    //variables to test things
    $scope.currentQuestionCard = $scope.questions[$scope.slideCounter];
    $scope.currentDisplayStatus = $scope.questions[$scope.slideCounter].show;
    $scope.currentQuestion = $scope.questions[$scope.slideCounter].question;
    $scope.nextQuestion = $scope.questions[$scope.slideCounter + 1].question;

    //function to make database post call
    $scope.postResults = function(){
        var dataObj = userDoshaResults.quizresults;
        var dosha = $scope.dosha(vataCount, pittaCount, kaphaCount);
        var data = {
            doshabalance: dosha,
            quizresults: dataObj
        };
        $http.post('/create', data).then(function(req, res, next){
            if(res.status !== 200){
                throw new Error("failed to retrieve data from server");
            }
        });
    };

    //function to store quiz results to user object array
    $scope.quizResult = function(){
        userDoshaResults.quizresults = {vatapts: vataCount, pittapts: pittaCount, kaphapts: kaphaCount};
        return userDoshaResults.quizresults;
    };

    //determining dosha type from quizresults
    $scope.dosha = function(v, p, k){
        var dosha;

        if (v > p && v > k) {
            dosha = "vata";
        } else if (p > v && p > k) {
            dosha = "pitta";
        } else if (k > p && k > v){
            dosha = "kapha";
        } else if (k == p && p == v){
            dosha = "tridoshic";
        } else if (k == p && k !== v){
            dosha = "kapha pitta";
        } else if (p == v && p !== k){
            dosha = "pitta vata";
        } else if (k == v && k !== p){
            dosha = "vata kapha";
        }

        return dosha;

    };

    //function to flip to new slide when a button choice is clicked
    $scope.nextQuestion = function(){
        if($scope.slideCounter < $scope.questions.length - 1){
            $scope.questions[$scope.slideCounter].show = false;
            $scope.questions[$scope.slideCounter + 1].show = true;
        } else {
            //NAV TO RESULTS PAGE & POST QUIZ RESULTS TO MONGODB
            $scope.changeRoute('/results');
            $scope.postResults();
        };
    };

}]);

