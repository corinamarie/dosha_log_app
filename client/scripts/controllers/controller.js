//////////////////VARIABLES

var vataCount = 0,
    pittaCount = 0,
    kaphaCount = 0,
    userDoshaResults = {};


////////////////primary dosha app controller -- controls Welcome page
doshApp.controller('DoshaController', ['$scope', '$location', function($scope, $location){
    console.log('dosha controller is up');

    $scope.testing = "we're up!";

    //change route function
    $scope.changeRoute = function(route){
        $location.path(route);
    };

}]);

///////////////results controller controls Results & History pages
doshApp.controller('ResultsController', ['$scope', function($scope){
    console.log('results controller is up');
    console.log(userDoshaResults);

    //recapturing global variable data from quiz results
    $scope.vataCount = vataCount;
    $scope.pittaCount = pittaCount;
    $scope.kaphaCount = kaphaCount;

}]);

///////////////dosha quiz controller controls Quiz page
doshApp.controller('QuizController', ['$scope', '$location', '$http', function($scope, $location, $http){
    console.log('quiz controller is up');

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
    console.log("slideCounter var: ", $scope.slideCounter);

    //change route function
    $scope.changeRoute = function(route){
        $location.path(route);
    };

    //variable counters for each dosha, with functions to save each click to global variables
    $scope.vataBtnCounter = function(){
        vataCount += 1;
        console.log("vata points: " + vataCount);
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

    //function to make database call
    $scope.getData = function(){
        $http.get('/getData').then(function(res){
            if(res.status !== 200){
                throw new Error("failed to retrieve data from server");
            }
            //console.log("the getData get call is working! res.data = ", res.data);
        });
    };

    $scope.getData();

    //function to make database post call

    $scope.postResults = function(){
        var dataObj = userDoshaResults.quizresults;
        var data = {
            quizresults: dataObj
        };
        $http.post('/create', data).then(function(req, res, next){
            if(res.status !== 200){
                throw new Error("failed to retrieve data from server");
            }
            console.log("the post call worked! the req var = ", req);
            console.log("the post call worked! the data var = ", data);
        });
    };

    //function to store quiz results to user object array
    $scope.quizResult = function(){
        userDoshaResults.quizresults = {vatapts: vataCount, pittapts: pittaCount, kaphapts: kaphaCount};
        return userDoshaResults.quizresults;
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

