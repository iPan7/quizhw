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
        imgSrc : "Assets/img/Daisy.jpg",
        choiceA : "The Mushroom Kingdom",
        choiceB : "Lorule",
        choiceC : "Sarasaland",
        choiceD : "Faerun",
        correct : "C"
    },
    {
        question: "Before becoming a plumber, what was Mario's original profession?",
        imgSrc : "Assets/img/mario.jpg",
        choiceA : "Carpenter",
        choiceB : "Doctor",
        choiceC : "He was always a Plumber",
        choiceD : "Butler",
        correct : "A"
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
        question: "Who composed the soundtrack for Modern Warfare 2?",
        imgSrc : "Assets/img/mw2.jpg",
        choiceA : "Jeremy Soule",
        choiceB : "Martin O'Donnell",
        choiceC : "Hans Zimmer",
        choiceD : "James Hannigan",
        correct : "C"
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
        question: "In the Star Wars universe, CT-1409 refers to which clone trooper?",
        imgSrc : "Assets/img/arc.jpg",
        choiceA : "Rex",
        choiceB : "Fives",
        choiceC : "Cody",
        choiceD : "Echo",
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
    {
        question: "Before founding Cerberus, what was the name of the 'Illusive Man' from the Mass Effect universe?",
        imgSrc : 'Assets/img/im.png',
        choiceA : "Jack Harper",
        choiceB : "Nirali Bhatia",
        choiceC : "Alvin Lessete",
        choiceD : "Aaron Bates",
        correct : "A"
    },
];


// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 100; // 100s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
var score = 0;

const MAX_HIGH_SCORES = 5;
var highScores;


// Leaderboard
setBoard();

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

// checkAnswer

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

function setBoard(){
    console.log("board is set");
    highScores = JSON.parse(localStorage.getItem("highScores")) || []; 
    let b = document.getElementById("rankings");
    if(localStorage.getItem("highScores") == null){
        console.log("no high scores found");
        return;
    }
    for(let i=0; i<highScores.length; i++){
        console.log(highScores[i]);
        b.innerHTML += "<li> " + highScores[i].name + ": "+ highScores[i].score2 + "%</li>"
    }
}

function saveHighScore(e){
    e.preventDefault();
    let username = document.getElementById("username").value;
    let myscore = score;
    console.log(myscore);
    const score2 = {
      score2: myscore,
      name: username
    };
    highScores.push(score2);
    highScores.sort((a, b) => b.score2 - a.score2);
    highScores.splice(MAX_HIGH_SCORES);
  
    localStorage.setItem("highScores", JSON.stringify(highScores));
    alert("Score Saved!");
    document.getElementById("saveScoreBtn").disabled = true;
  }