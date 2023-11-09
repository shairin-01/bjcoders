const container =document.querySelector('.container');
const questionBox =document.querySelector('.question');
const choicesBox =document.querySelector('.choices');
const nextBtn =document.querySelector('.nextBtn');
const scoreCard =document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn=document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const quiz =[
    {
        question:"Q.THE WORLD FAMOUS MONUMENT 'PYRAMID' IS LOCATED IN ?",
        choices:["RUSSIA","IRAQ","EGYPT","GREECE"],
        answer:"EGYPT"
    },
    {
        question:"Q.WHICH AMONG THE FOLLOWING PLANETS LOOKS GREENISH ?",
        choices:["SATURN","VENUS","URANUS","EARTH"],
        answer:"URANUS"
    },
    {
        question:"Q.ARAM BAGH IS LOCATED IN ?",
        choices:["BIKANER","JAIPUR","AGRA","DELHI"],
        answer:"AGRA"
    },
    {
        question:"Q.NATIONAL EMBLEM OF AUSTRALIA IS ?",
        choices:["KANGAROO","WHITE LILY","ROSE","LILY"],
        answer:"KANGAROO"
    },
    {
        question:"Q.THE LONGEST RIVER OF PENINSULAR INDIA IS ?",
        choices:["NARMADA","GODAVARI","MAHANADI","KAVERI"],
        answer:"GODAVARI"
    }
];

let currentQuestionIndex =0;
let score = 0;
let quizOver = false ;
let timeLeft = 15;
let timerID = null;

const showQuestions = () =>{
   const questionDetails =quiz[currentQuestionIndex];
   questionBox.textContent = questionDetails.question;
   choicesBox.textContent ="";
   for (let i=0; i<questionDetails.choices.length;i++){
    const currentChoice =questionDetails.choices[i];
    const choiceDiv = document.createElement('div');
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add('choice');
    choicesBox.appendChild(choiceDiv);

    choiceDiv.addEventListener('click',()=>{
        if(choiceDiv.classList.contains('selected')){
            choiceDiv.classList.remove('selected');
        }
        else{
            choiceDiv.classList.add('selected');
        }
    });
   }

   if(currentQuestionIndex < quiz.length){
    startTimer();
   }
   
}

const checkAnswer = () => {
    const selectedChoice =document.querySelector('.choice.selected');
    if(selectedChoice.textContent ===quiz[currentQuestionIndex].answer){
       // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else{
        //alert("Wrong Answer!");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer `);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
       }
       else{
        showScore();
        stopTimer();
       }
    
}
const showScore = () =>{
    questionBox.textContent = "";
    choicesBox.textContent = "" ;
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none" ;
}


const displayAlert = (msg) =>{ 
    alert.style.display = "block" ;
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none" ;
    }, 2000);
}

const startTimer = () =>{
    clearInterval(timerID);
    timer.textContent = timeLeft;


    const countDown = () =>{
    timeLeft--;
    timer.textContent = timeLeft;
    if(timeLeft === 0)  {
       const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
       if(confirmUser){
        timeLeft = 15 ;
        startQuiz();
       }
       else{
        startBtn.style.display = "block";
        container.style.display = "none";

       }
    }
  }
   timerID = setInterval(countDown, 1000);
}


const stopTimer = ()=>{
    clearInterval(timerID);

}

const shuffleQuestions = ()=>{
    for(let i=quiz.length-1; i>0; i--){
        const j =Math.floor(Math.random() * (i+1));
        [quiz[i],quiz[j]] = [quiz[j],quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();

}
const startQuiz = () =>{
    timeLeft =15;
    timer.style.display = "flex";
    shuffleQuestions();
    
}
startBtn.addEventListener('click', ()=>{
  startBtn.style.display = "none" ;
  container.style.display = "block" ;
  startQuiz();
});
//showQuestions();
nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');   
    if(!selectedChoice && nextBtn.textContent ==="Next"){
        //alert("Select Your Answer");
        displayAlert("Select Your Answer");
        return;
    }
    if(quizOver){
       nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0 ;        
        quizOver = false;
        score = 0;   
        startQuiz();
    }
    else{
    checkAnswer();
    }
});





