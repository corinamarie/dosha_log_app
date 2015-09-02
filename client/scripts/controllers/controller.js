//////////////////VARIABLES

var vataCount = 0,
    pittaCount = 0,
    kaphaCount = 0,
    userDoshaResults = {};

/////////////////FACTORIES
//doshApp.factory('ChangeRoute', ['$location', 'route', function($location, route){
//
//}]);

////////////////primary dosha app controller
doshApp.controller('DoshaController', ['$scope', function($scope){
    console.log('dosha controller is up');

    //

}]);


doshApp.controller('ResultsController', ['$scope', function($scope){
    console.log('results controller is up');
    console.log(userDoshaResults);

    //recapturing global variable data from quiz results
    $scope.vataCount = vataCount;
    $scope.pittaCount = pittaCount;
    $scope.kaphaCount = kaphaCount;

}]);

///////////////dosha quiz controller
doshApp.controller('QuizController', ['$scope', '$location', function($scope, $location){
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
            question: 'height',
            answer: {
                vata: 'tall or very short',
                pitta: 'medium',
                kapha: 'usually short but can be tall and large'
            },
            show: true
        },
        {
            question: 'frame',
            answer: {
                vata: 'thin, bony good muscles',
                pitta: 'moderate, developed',
                kapha: 'large, well-formed'
            },
            show: false
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
            question: 'hair',
            answer: {
                vata: 'dry, thin',
                pitta: 'thin, oily',
                kapha: 'thick, oily, wavy, lustrous'
            },
            show: false
        },
        {
            question: 'teeth',
            answer: {
                vata: 'crooked, poorly formed',
                pitta: 'moderate, bleeding gums',
                kapha: 'large, well formed'
            },
            show: false
        },
        {
            question: 'nails',
            answer: {
                vata: 'rough, brittle',
                pitta: 'soft, pink',
                kapha: 'soft, white'
            },
            show: false
        },
        {
            question: 'joints',
            answer: {
                vata: 'stiff, crack easily',
                pitta: 'loose',
                kapha: 'firm, large'
            },
            show: false
        },
        {
            question: 'circulation',
            answer: {
                vata: 'poor, variable',
                pitta: 'good',
                kapha: 'moderate'
            },
            show: false
        },
        {
            question: 'appetite',
            answer: {
                vata: 'variable, nervous',
                pitta: 'high, excessive',
                kapha: 'mdoerate but constant'
            },
            show: false
        },
        {
            question: 'thirst',
            answer: {
                vata: 'low, scanty',
                pitta: 'high',
                kapha: 'moderate'
            },
            show: false
        },
        {
            question: 'sweating',
            answer: {
                vata: 'scanty',
                pitta: 'profuse but not enduring',
                kapha: 'low to start but profuse'
            },
            show: false
        },
        {
            question: 'stool',
            answer: {
                vata: 'hard or dry',
                pitta: 'soft, loose',
                kapha: 'normal'
            },
            show: false
        },
        {
            question: 'urination',
            answer: {
                vata: 'scanty',
                pitta: 'profuse, yellow',
                kapha: 'moderate, clear'
            },
            show: false
        },
        {
            question: 'sensitivities',
            answer: {
                vata: 'cold, dryness, wind',
                pitta: 'heat, sunlight, fire',
                kapha: 'cold, damp'
            },
            show: false
        },
        {
            question: 'immune function',
            answer: {
                vata: 'low, variable',
                pitta: 'moderate, sensitive to heat',
                kapha: 'high'
            },
            show: false
        },
        {
            question: 'disease tendency',
            answer: {
                vata: 'pain, inflammation',
                pitta: 'fever, edema',
                kapha: 'congestion'
            },
            show: false
        },
        {
            question: 'disease type',
            answer: {
                vata: 'nervous',
                pitta: 'blood, liver',
                kapha: 'mucous, lungs'
            },
            show: false
        },
        {
            question: 'activity',
            answer: {
                vata: 'high, restless',
                pitta: 'moderate',
                kapha: 'low, moves slowly'
            },
            show: false
        },
        {
            question: 'endurance',
            answer: {
                vata: 'poor, easily exhausted',
                pitta: 'moderate but focused',
                kapha: 'high'
            },
            show: false
        },
        {
            question: 'sleep',
            answer: {
                vata: 'poor, disturbed',
                pitta: 'variable',
                kapha: 'excess'
            },
            show: false
        },
        {
            question: 'dreams',
            answer: {
                vata: 'frequent, colorful',
                pitta: 'moderate, romantic',
                kapha: 'infrequent, disturbed'
            },
            show: false
        },
        {
            question: 'memory',
            answer: {
                vata: 'quick but absent-minded',
                pitta: 'sharp, clear',
                kapha: 'slow but steady'
            },
            show: false
        },
        {
            question: 'speech',
            answer: {
                vata: 'fast, frequent',
                pitta: 'sharp, cutting',
                kapha: 'slow, melodious'
            },
            show: false
        },
        {
            question: 'temperament',
            answer: {
                vata: 'nervous, changeable',
                pitta: 'motivated',
                kapha: 'content, conservative'
            },
            show: false
        },
        {
            question: 'positive emotions',
            answer: {
                vata: 'adaptability',
                pitta: 'courage',
                kapha: 'love'
            },
            show: false
        },
        {
            question: 'negative emotions',
            answer: {
                vata: 'fear',
                pitta: 'anger',
                kapha: 'attachment'
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
    console.log("slideCounter var: ", $scope.slideCounter);
    //vata, pitta, & kapha questioncard button logic
    //function for moving to the next card, activate within conditional below per each button choice click event


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
        console.log("pitta points: " + pittaCount);
        $scope.quizResult();
        $scope.nextQuestion();
        $scope.slideCounter += 1;
    };
    $scope.kaphaBtnCounter = function(){
        kaphaCount += 1;
        console.log("kapha points: " + kaphaCount);
        $scope.quizResult();
        $scope.nextQuestion();
        $scope.slideCounter += 1;
    };

    //this should give a variable to use in html to display current question & corresponding answers
    console.log("Before variables: ", $scope.slideCounter);
    $scope.currentQuestionCard = $scope.questions[$scope.slideCounter];
    $scope.currentDisplayStatus = $scope.questions[$scope.slideCounter].show;
    console.log($scope.currentDisplayStatus);
    console.log($scope.questions[$scope.slideCounter + 1].show);
    $scope.currentQuestion = $scope.questions[$scope.slideCounter].question;
    $scope.nextQuestion = $scope.questions[$scope.slideCounter + 1].question;

    //function to flip to new slide when a button choice is clicked
    $scope.nextQuestion = function(){
        if($scope.slideCounter < $scope.questions.length - 1){
            $scope.questions[$scope.slideCounter].show = false;
            $scope.questions[$scope.slideCounter + 1].show = true;
        } else {
            $location.path('/results');
        };
    };

    //function to store quiz results to user object array
    $scope.quizResult = function(){
        userDoshaResults.quizResult = [vataCount, pittaCount, kaphaCount];
        console.log(userDoshaResults.quizResult);
        return userDoshaResults.quizResult;
        //add in current date/time as object property per quiz taken
    };

}]);
