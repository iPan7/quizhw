const start = document.querySelector("start");

const quiz = document.querySelector("quiz");

const qImg = document.querySelector("questionImage");

const question = document.querySelector("question");

const counter = document.querySelector("counter");

const timeGauge = document.querySelector("timeGauge");

const choiceA = document.querySelector("A");
const choiceB = document.querySelector("B");
const choiceC = document.querySelector("C");
const choiceD = document.querySelector("D");

const progress = document.getElementById("progress");

const scoreContainer = document.getElementById("scoreContainer")

var questions = [
    {
        question: "Princess Daisy from the Super Mario franchise is the princess of which land?",
        imgSrc : "img/html.png",
        choiceA : "The Mushroom Kingdom",
        choiceB : "Lorule",
        choiceC : "Sarasaland",
        choiceD : "Faerun",
        correct : "C"
    },
    {
        question: "In Call of Duty 4: Modern Warfare, what is the name of the character you play as during the mission 'All Ghillied Up'?",
        imgSrc : "img/html.png",
        choiceA : "John Price",
        choiceB : "Soap Mactavish",
        choiceC : "Simon Riley",
        choiceD : "Yuri",
        correct : "A"
    },
    {
        question: "In the Star Wars universe, who was responsible for the invention of the TIE fighter?",
        imgSrc : "img/html.png",
        choiceA : "Ailyn Vel",
        choiceB : "Cara Dune",
        choiceC : "Moff Tarkin",
        choiceD : "Raith Sienar",
        correct : "D"
    },
    {
        question: "Who was the main pilot of the Normandy SR2 in Mass Effect 2 and 3?",
        imgSrc : "img/html.png",
        choiceA : "Jacob Taylor",
        choiceB : "Jeff Moreau",
        choiceC : "Rupert Gardner",
        choiceD : "Simo Hayha",
        correct : "B"
    },
];

var lastQuestionIndex = questions.length - 1;
var runningQuestionIndex = 0;

function renderQuestion(){
    let q = questions[runningQuestionIndex];
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

runningQuestionIndex = 0;
renderQuestion()

runningQuestionIndex++
renderQuestion()