//VARIABLES

var vataCount = 0,
    pittaCount = 0,
    kaphaCount = 0,
    userDoshaResults = {};

//primary dosha app controller
doshApp.controller('DoshaController', ['$scope', function($scope){
    console.log('dosha controller is up');

    //

}]);

doshApp.controller('ResultsController', ['$scope', function($scope){
    console.log('results controller is up');

    //

}]);

//dosha quiz controller
doshApp.controller('QuizController', ['$scope', function($scope){
    console.log('quiz controller is up');

    //variable to count and move through question slides
    $scope.slideCounter = 0;

    //vata, pitta, & kapha questioncard button logic
    //function for moving to the next card, activate within conditional below per each button choice click event


    //variable counters for each dosha, with functions to save each click to global variables
    $scope.vataBtnCounter = function(){
        vataCount += 1;
        $scope.slideCounter += 1;
        console.log("vata points: " + vataCount);
        $scope.quizResult();
    };
    $scope.pittaBtnCounter = function(){
        pittaCount += 1;
        $scope.slideCounter += 1;
        console.log("pitta points: " + pittaCount);
        $scope.quizResult();
    };
    $scope.kaphaBtnCounter = function(){
        kaphaCount += 1;
        $scope.slideCounter += 1;
        console.log("kapha points: " + kaphaCount);
        $scope.quizResult();
    };

    //this should give a variable to use in html to display current question & corresponding answers
    $scope.currentQuestionCard = $scope.questions[$scope.slideCounter];
    $scope.currentDisplayStatus = $scope.questions[$scope.slideCounter].show;
    $scope.currentQuestion = $scope.questions[$scope.slideCounter].question;
    $scope.currentVataAnswer = $scope.questions[$scope.slideCounter].answer.vata;

    //function to flip to new slide when a button choice is clicked
    $scope.nextQuestion = function(){
        $scope.questions[$scope.slideCounter].show = false;
        $scope.questions[$scope.slideCounter + 1].show = true;
    };

    //function to show & hide questions
    $scope.displayQuestion = function(){
        if($scope.currentDisplayStatus == true){
            //show slide
        } else {
            //hide slide
        }
    };

    //function to store quiz results to user object array
    $scope.quizResult = function(){
        userDoshaResults.quizResult = [vataCount, pittaCount, kaphaCount];
        console.log(userDoshaResults.quizResult);
        return userDoshaResults.quizResult;
        //add in current date/time as object property per quiz taken
    };

    //dosha quiz question data "schema"
    //questions from David Frawley's "Yoga & Ayurveda"
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
            }
        },
        {
            question: 'weight',
            answer: {
                vata: 'low, hard to hold weight',
                pitta: 'moderate',
                kapha: 'heavy, hard to lose weight'
            }
        },
        {
            question: 'skin luster',
            answer: {
                vata: 'dull or dusky',
                pitta: 'ruddy, lustrous',
                kapha: 'white or pale'
            }
        },
        {
            question: 'skin texture',
            answer: {
                vata: 'dry, rough, thin',
                pitta: 'warm, oily',
                kapha: 'cold, damp, thick'
            }
        },
        {
            question: 'eyes',
            answer: {
                vata: 'small, nervous',
                pitta: 'piercing, easily inflamed',
                kapha: 'large, white'
            }
        },
        {
            question: 'hair',
            answer: {
                vata: 'dry, thin',
                pitta: 'thin, oily',
                kapha: 'thick, oily, wavy, lustrous'
            }
        },
        {
            question: 'teeth',
            answer: {
                vata: 'crooked, poorly formed',
                pitta: 'moderate, bleeding gums',
                kapha: 'large, well formed'
            }
        },
        {
            question: 'nails',
            answer: {
                vata: 'rough, brittle',
                pitta: 'soft, pink',
                kapha: 'soft, white'
            }
        },
        {
            question: 'joints',
            answer: {
                vata: 'stiff, crack easily',
                pitta: 'loose',
                kapha: 'firm, large'
            }
        },
        {
            question: 'circulation',
            answer: {
                vata: 'poor, variable',
                pitta: 'good',
                kapha: 'moderate'
            }
        },
        {
            question: 'appetite',
            answer: {
                vata: 'variable, nervous',
                pitta: 'high, excessive',
                kapha: 'mdoerate but constant'
            }
        },
        {
            question: 'thirst',
            answer: {
                vata: 'low, scanty',
                pitta: 'high',
                kapha: 'moderate'
            }
        },
        {
            question: 'sweating',
            answer: {
                vata: 'scanty',
                pitta: 'profuse but not enduring',
                kapha: 'low to start but profuse'
            }
        },
        {
            question: 'stool',
            answer: {
                vata: 'hard or dry',
                pitta: 'soft, loose',
                kapha: 'normal'
            }
        },
        {
            question: 'urination',
            answer: {
                vata: 'scanty',
                pitta: 'profuse, yellow',
                kapha: 'moderate, clear'
            }
        },
        {
            question: 'sensitivities',
            answer: {
                vata: 'cold, dryness, wind',
                pitta: 'heat, sunlight, fire',
                kapha: 'cold, damp'
            }
        },
        {
            question: 'immune function',
            answer: {
                vata: 'low, variable',
                pitta: 'moderate, sensitive to heat',
                kapha: 'high'
            }
        },
        {
            question: 'disease tendency',
            answer: {
                vata: 'pain, inflammation',
                pitta: 'fever, edema',
                kapha: 'congestion'
            }
        },
        {
            question: 'disease type',
            answer: {
                vata: 'nervous',
                pitta: 'blood, liver',
                kapha: 'mucous, lungs'
            }
        },
        {
            question: 'activity',
            answer: {
                vata: 'high, restless',
                pitta: 'moderate',
                kapha: 'low, moves slowly'
            }
        },
        {
            question: 'endurance',
            answer: {
                vata: 'poor, easily exhausted',
                pitta: 'moderate but focused',
                kapha: 'high'
            }
        },
        {
            question: 'sleep',
            answer: {
                vata: 'poor, disturbed',
                pitta: 'variable',
                kapha: 'excess'
            }
        },
        {
            question: 'dreams',
            answer: {
                vata: 'frequent, colorful',
                pitta: 'moderate, romantic',
                kapha: 'infrequent, disturbed'
            }
        },
        {
            question: 'memory',
            answer: {
                vata: 'quick but absent-minded',
                pitta: 'sharp, clear',
                kapha: 'slow but steady'
            }
        },
        {
            question: 'speech',
            answer: {
                vata: 'fast, frequent',
                pitta: 'sharp, cutting',
                kapha: 'slow, melodious'
            }
        },
        {
            question: 'temperament',
            answer: {
                vata: 'nervous, changeable',
                pitta: 'motivated',
                kapha: 'content, conservative'
            }
        },
        {
            question: 'positive emotions',
            answer: {
                vata: 'adaptability',
                pitta: 'courage',
                kapha: 'love'
            }
        },
        {
            question: 'negative emotions',
            answer: {
                vata: 'fear',
                pitta: 'anger',
                kapha: 'attachment'
            }
        },
        {
            question: 'faith',
            answer: {
                vata: 'variable, erratic',
                pitta: 'strong, determined',
                kapha: 'steady, slow to change'
            }
        }
    ]
}]);