//////////////////VARIABLES

var vataCount = 0,
    pittaCount = 0,
    kaphaCount = 0,
    userDoshaResults = {},
    doshaType,
    dosha;


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
    $scope.doshaType = doshaType;

    //function to make database call
    $scope.getData = function(){
        $http.get('/getData').then(function(response){
            if(response.status !== 200){
                throw new Error("failed to retrieve data from server");
            }
            $scope.userHistory = response.data;
            //var date = response.data.date;
            //date.toDateString();
            //console.log("this is the date var: ", date)
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
            question: 'height',
            answer: {
                vata: 'thin, bony good muscles',
                pitta: 'moderate, developed',
                kapha: 'large, well-formed'
            },
            show: true
        },
        {
            question: 'weight',
            answer: {
                vata: 'low, hard to hold weight',
                pitta: 'moderate',
                kapha: 'heavy, hard to lose weight'
                },
            show: false
        },
        {
            question: 'skin luster',
            answer: {
                vata: 'dull or dusky',
                pitta: 'ruddy, lustrous',
                kapha: 'white or pale'
            },
            show: false
        },
        {
            question: 'skin texture',
            answer: {
                vata: 'dry, rough, thin',
                pitta: 'warm, oily',
                kapha: 'cold, damp, thick'
            },
            show: false
        },
        {
            question: 'eyes',
            answer: {
                vata: 'small, nervous',
                pitta: 'piercing, easily inflamed',
                kapha: 'large, white'
            },
            show: false
        },
        {
            question: 'faith',
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

        if (v > p && v > k) {
            doshaType = "vata";
        } else if (p > v && p > k) {
            doshaType = "pitta";
        } else if (k > p && k > v){
            doshaType = "kapha";
        } else if (k == p && p == v){
            doshaType = "tridoshic";
        } else if (k == p && k !== v){
            doshaType = "kapha pitta";
        } else if (p == v && p !== k){
            doshaType = "pitta vata";
        } else if (k == v && k !== p){
            doshaType = "vata kapha";
        }

        //doshaType = dosha;
        return doshaType;

    };
    //console.log("this is post dosh function console: ", doshaType);

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

