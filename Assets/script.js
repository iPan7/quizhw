// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question: "Princess Daisy from the Super Mario franchise is the princess of which land?",
        imgSrc : "Assets/img/Daisy.png",
        choiceA : "The Mushroom Kingdom",
        choiceB : "Lorule",
        choiceC : "Sarasaland",
        choiceD : "Faerun",
        correct : "C"
    },
    {
        question: "In Call of Duty 4: Modern Warfare, what is the name of the character you play as during the mission 'All Ghillied Up'?",
        imgSrc : "Assets/img/ghilliedup.jpg",
        choiceA : "John Price",
        choiceB : "Soap Mactavish",
        choiceC : "Simon Riley",
        choiceD : "Yuri",
        correct : "A"
    },
    {
        question: "In the Star Wars universe, who was responsible for the invention of the TIE fighter?",
        imgSrc : "Assets/img/TIE.jpg",
        choiceA : "Ailyn Vel",
        choiceB : "Cara Dune",
        choiceC : "Moff Tarkin",
        choiceD : "Raith Sienar",
        correct : "D"
    },
    {
        question: "Who was the main pilot of the Normandy SR2 in Mass Effect 2 and 3?",
        imgSrc : 'Assets/img/SR2.jpg',
        choiceA : "Jacob Taylor",
        choiceB : "Jeff Moreau",
        choiceC : "Rupert Gardner",
        choiceD : "Simo Hayha",
        correct : "B"
    },
];


// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 1000; // 60s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
var score = 0;


// Leaderboard
setleaderboard();

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePercent = Math.round(100 * score/questions.length);
    score = scorePercent;

    // choose the image based on the scorePerCent
    let img = (scorePercent >= 80) ? "Assets/img/5.png" :
              (scorePercent >= 60) ? "Assets/img/4.png" :
              (scorePercent >= 40) ? "Assets/img/3.png" :
              (scorePercent >= 20) ? "Assets/img/2.png" :
              "Assets/img/1.png";

var scoreimg = document.getElementById("scoreimg");
var scorenumber = document.getElementById("scorenumber");
scorenumber.innerHTML = scorePercent;
scoreimg.src = img;

}


function saveHighScore(event){
    let username = document.getElementById("username").value;
    alert(username + " highscoresaved! " + score + "%");
    if (localStorage.getItem("highscore") == null){
        localStorage.setItem("username", username);
        localStorage.setItem("highscore", score);    
    }

    else if (localStorage.highscore < score){
        localStorage.setItem("username", username);
        localStorage.setItem("highscore", score);    
    }
}

function setleaderboard(){
    let firstplace = document.getElementById("first");
    if (localStorage.username){
        firstplace.innerHTML=localStorage.username+": " + localStorage.highscore + "%";
    }
    else{
        firstplace.innerHTML="No high score recorded.";
    }
}

// //saving scores

// const username = document.getElementById("username");
// const saveScoreBtn = document.getElementById("saveScoreBtn");
// const finalScore = document.getElementById("finalScore");
// const mostRecentScore = localStorage.getItem("mostRecentScore");

// const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// const MAX_HIGH_SCORES = 5;

// finalScore.innerText = mostRecentScore;

// username.addEventListener("keyup", () => {
//   saveScoreBtn.disabled = !username.value;
// });

// saveHighScore = e => {
//   console.log("clicked the save button!");
//   e.preventDefault();

//   const score = {
//     score: Math.floor(Math.random() * 100),
//     name: username.value
//   };
//   highScores.push(score);
//   highScores.sort((a, b) => b.score - a.score);
//   highScores.splice(5);

//   localStorage.setItem("highScores", JSON.stringify(highScores));
//   window.location.assign("/");
// };