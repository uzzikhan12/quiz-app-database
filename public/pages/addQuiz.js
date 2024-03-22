import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase,set,ref,push } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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

var corrAns = document.getElementById("corrAns");
var optionParent = document.getElementById("optionParent");
var option = document.getElementById("option");
var question = document.getElementById("question");

var options = [];
var correct;

function renderOption () {

    optionParent.innerHTML = "";
    for (let i=0;i<options.length;i++) {
        optionParent.innerHTML += `<li onclick="correctAnswer('${options[i]}')" class='bg-light p-2 my-2 fs-5 rounded shadow text-black'>${options[i]}</li>`
    }
}

window.addOption = function(){
    options.push(option.value);
    console.log(options);
    renderOption();
}

window.correctAnswer = function(a) {
    correct = a;
    corrAns.innerHTML = correct;
}

window.submitQues = function (){
    var obj = {
        question : question.value ,
        option : options,
        correct:correct
    }

    obj.id = push(ref(db,'questions/')).key;
    const refrence = ref(db, `questions/${obj.id}`);
    set(refrence, obj);

    console.log(obj);
}