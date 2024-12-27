(function(){
function quiz(){
const output=[];
myQuestion.forEach((currentquestion,questionnumber)=>{

    const answer=[];
    for(a in currentquestion.answer){
        answer.push(
            `<label>
            <br>
            <input type="radio" name="question${questionnumber}" value="${a}" required>
            ${a}:${currentquestion.answer[a]}
            <br>
            </label>`
        );
    }
    output.push(
        `<div class="slide">
        <div class="question">${currentquestion.question}</div>
        <div class="answer">${answer.join('')}</div>
        </div>`
    );
}
);
qn.innerHTML=output.join('');
startQuestionTimer();
}
    
  function checkAns(){
    const answercontainer= qn.querySelectorAll('.answer');
    let numCorrect=0;
    myQuestion.forEach((currentquestion,questionnumber)=>{
        const ans=answercontainer[questionnumber];
        const selector=`input[name=question${questionnumber}]:checked`;
        const userAns=(ans.querySelector(selector)||{}).value;
        if(userAns===currentquestion.correctAnswer){
            numCorrect++;
            answercontainer[questionnumber].style.color='lightgreen'
        }
        else{
            answercontainer[questionnumber].style.color='red'
        }
    });
       res.innerHTML=`${numCorrect} is correct out of ${myQuestion.length}`
       stopQuestionTimer();   
  }  
  
  function showSlide(n){
    slides[currentslide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentslide = n;
    if(currentslide===0){
        prevbtn.style.display='none';
        
    }
    else{
        prevbtn.style.display='inline-block';
         
    }
    if(currentslide===slides.length-1){
        nextbtn.style.display='none';
        submit.style.display='inline-block';
    }
    else{
        nextbtn.style.display='inline-block';
         submit.style.display='none'
    }
    
}

let timeLeft = 10; 
let timer; 
function startQuestionTimer() {
  
  timeLeft = 10;
  clearInterval(timer);

  timer = setInterval(() => {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      timerElement.textContent = `⏳Time Remaining: ${timeLeft}s`;
    }

    timeLeft--;
    
    if (timeLeft < 0) {
      clearInterval(timer); 
      alert('Time up!');
      nextSlide();
      
    }
  }, 1000);
}

function stopQuestionTimer() {
  clearInterval(timer);
}
    
    function nextSlide(){
        showSlide(currentslide+1);
        startQuestionTimer();
    }
    function prevSlide(){
        showSlide(currentslide-1);
        startQuestionTimer();
    }
    
    
  const qn= document.getElementById("qn")
  const res=document.getElementById("res")
  const bt=document.getElementById("submit")
  const prevbtn=document.getElementById("previous");
const nextbtn=document.getElementById("next");

    
    const myQuestion=[
        { question:"1.What is the abbrevation of DOM ?",
            answer:{
                a:"Document Observation Medium",
                b:"Document Object Model",
                c:"Driver Object Medium"
            },
            correctAnswer:"b"
        },
        { question:"2.What does ... represent in Javascript?",
            answer:{
                a:"Spread Operator",
                b:"Expand Operator",
                c:"Sequence Operator"
            },
            correctAnswer:"a"
        },
        { question:`3. function add(a,b)<br>
            return a+b;<br>
        let r=add();<br>
        document.writeln(r);<br>
        Predict the output ?`,
            answer:{
                a:"undefined",
                b:"syntax error",
                c:"NaN"
            },
            correctAnswer:"c"
        }
    ];

    quiz();
    
    const slides=document.querySelectorAll(".slide");
let currentslide=0;

showSlide(currentslide);

    bt.addEventListener('click', checkAns);
    prevbtn.addEventListener("click", prevSlide);
nextbtn.addEventListener("click", nextSlide);


})();
