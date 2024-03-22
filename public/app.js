import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase,ref,onChildAdded } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDaf-66m6UsZ_SgOgUUtU3wS3Xo7RlzZRg",
    authDomain: "public-2c7e3.firebaseapp.com",
    projectId: "public-2c7e3",
    storageBucket: "public-2c7e3.appspot.com",
    messagingSenderId: "925014504428",
    appId: "1:925014504428:web:b2b9cd5ce2a603beaac6c9",
    measurementId: "G-LM439GPP60"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var loader = document.getElementById("loader");
var showQuestion = document.getElementById("showQuestion");

function dataFromDatabase() {
  loader.style.display = "block";
  showQuestion.style.display = "none";

  const refrence = ref(db, 'questions/');
  onChildAdded(refrence, function (data){
    console.log(data.val());
    questions.push(data.val())

    loader.style.display = "none";
    showQuestion.style.display = "block";
  
    renderQues();
  })
}


dataFromDatabase();

var questions = [];


var currQues = document.getElementById("currQues");
var totalQues = document.getElementById("totalQues");
var ques = document.getElementById("ques");
var optParent = document.getElementById("optParent");

var userMarks = document.getElementById("displayMarks");
var dispStatus = document.getElementById("displayStatus");
var percentage = document.getElementById("displayPercentage");
var grade = document.getElementById("displayGrade");
var result = document.getElementById("lastResult");


let index = 0;
let score = 0; 


window.checkQues =  function (a,b) {
  if(a == b){
    score++;
    // console.log(score);
  }
  nextQues();
}

window.nextQues = function() {

  // if(index + 1 == questions.length){

  //   alert("Your score is" + score);

  // }else{
  //   index++;
  //   renderQues();
  // }

  if(index + 1 == questions.length){
    result.style.display = "block";
    showQuestion.style.display = "none";

    var totalMarks = questions.length;

    var userPercentage = (score / totalMarks) * 100;
    userMarks.innerHTML = score;
    percentage.innerHTML = userPercentage.toFixed() + "%";

    if(userPercentage > 79){
        grade.innerHTML = "A+";
      }
      if(userPercentage <= 70 ){
        grade.innerHTML = "B";
      } 
      if(userPercentage <= 59 ){
        grade.innerHTML ="C";
      }
      if (userPercentage <= 50) {
        dispStatus.innerHTML = "Fail";
        grade.innerHTML = "F";
      }
      else {
        dispStatus.innerHTML = "Pass";
      }
    }
    else {
        index++
        renderQues();            
    }

}

window.reset = function() {
  index = 0;
  score = 0;
  result.style.display = "none";
  showQuestion.style.display = "block"; 
  renderQues();
}

function renderQues() {
    currQues.innerHTML = index + 1;
    totalQues.innerHTML = questions.length;
    var obj = questions[index];
    ques.innerHTML = obj.question;
    optParent.innerHTML = "";

    for(var i = 0; i < obj.option.length; i++){
        optParent.innerHTML += `
        <div class="col-md-6">
            <div class="py-2">
                <button onclick="checkQues('${obj.option[i]}','${obj.correct}')" class="btn  btn-light shadow  fs-4 p-2 rounded-pill w-75">
                    ${obj.option[i]}
                </button>
            </div>
        </div>
        `
    }
}

// renderQues();


