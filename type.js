/*
  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels and time
  ---- [02] Show Level And Seconds text
         //////////////////
  ---- [04] Add Start Game Button press
  ---- [03] 
               Add random word
               Disable Copy Word And Paste Event
               remove Rword from array
               Add Array Of Words
  ---- [05] Generate Upcoming Words + clear section every gen
  ---- [06] Focus On Input
         /////////////////
  ---- [07] Start Play Function interval
               inputs vs word
  ---- [08] Timeout, Count Score, assess result.
  ---- [09] Add The loss And Success Messages
            recall new Random word

  ______________________________________
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
   "Hello",
   "Code",
   "Javascript",
   "Town",
   "Country",
   "Testing",
   "Programming",
   "Youtube",
   "Linkedin",
   "Twitter",
];
const lvls = {
   Easy: 5,
   Normal: 3,
   Hard: 2,
};

// Document Elements
const selectBox = document.querySelector("#select");
const lvl = document.querySelector("nav .lvl");
const wordsLeft = document.querySelector("footer .words-left");
const timeLeft = document.querySelectorAll("aside .second");
const scoreFrom = document.querySelector("footer .arr-length");
const correctType = document.querySelector("footer .correct");
const upcomingWords = document.querySelector("main.words-arr");
const startBtn = document.querySelector("header button");
const theWord = document.querySelector("aside .word");
const input = document.querySelector(".input-field");
const footerTime = document.querySelector("footer .second");
const result = document.querySelector("aside .result");
const clr = document.querySelector(".scoring .clr");
const scoreDiv = document.querySelector(".scoring .old-score");
const scoreBtn = document.querySelector(".scoring .open-score");
const infoBtn = document.querySelector(".instruction button");
const pInfo = document.querySelectorAll(".instruction p");
let randoWord;
let doorWedge = false;
let arrScore = [];
let levelInfo;

// Check localStorage for old score
if (window.localStorage.getItem("scores")) {
   arrScore = JSON.parse(localStorage.getItem("scores"));
   arrScore.forEach((o) => {
      appendScoreEle(o);
   });
}
// Check localStorage for Level and TimeLeft
if (window.localStorage.getItem("level")) {
   levelInfo = JSON.parse(localStorage.getItem("level"));
   console.log(levelInfo.timing);
   updateLvlTime(levelInfo);
} else {
   // Default lvl and timeLeft values
   let defaultLvl = "Hard";
   selectBox.value = defaultLvl;
   lvl.innerText = defaultLvl;
   timeLeft.forEach((t) => {
      t.innerText = lvls[defaultLvl];
   });
}
function updateLvlTime(l) {
   timeLeft.forEach((w) => {
      w.innerText = l.timing;
   });
   lvl.innerText = l.level;
   selectBox.value = l.level;
}

input.onpaste = function () {
   return false;
};

// Update Level and time
selectBox.onchange = function () {
   timeLeft.forEach((w) => {
      w.innerText = lvls[selectBox.value];
   });
   lvl.innerText = selectBox.value;
   let lvlObj = {
      level: selectBox.value,
      timing: lvls[selectBox.value],
   };
   localStorage.setItem("level", JSON.stringify(lvlObj));
};

// score count From
scoreFrom.innerText = words.length;

// Click start
startBtn.addEventListener("click", everyTurn);
startBtn.addEventListener("click", addInitialTime);
// Press Enter to start
window.addEventListener("keypress", (e) => {
   if (e.key === "Enter") {
      everyTurn();
      addInitialTime();
   }
});

function addInitialTime() {
   footerTime.innerText = lvls[selectBox.value] + 2;
}

//=====( FUNCTIONS SECTION )====\\

function everyTurn() {
   // Random word & Append it & Remove it from array
   randoWord = words[Math.floor(Math.random() * words.length)];
   theWord.innerText = randoWord;
   console.log(randoWord);
   words.splice(words.indexOf(randoWord), 1);

   // Delete btn & Display the word
   startBtn.style.display = "none";
   theWord.style.display = "block";
   input.focus();

   // Append Array of words to document
   upcomingWords.innerHTML = "";
   words.forEach((w) => {
      let newWord = document.createElement("span");
      newWord.innerText = w;
      upcomingWords.append(newWord);
   });
   wordsLeft.innerText = words.length;
   //
   play();
}

// Play the turn
function play() {
   footerTime.innerText = lvls[selectBox.value];
   let fTime = setInterval(() => {
      footerTime.innerText--;
      if (footerTime.innerText == "0") {
         clearInterval(fTime);
         if (input.value.toLowerCase() == randoWord.toLowerCase()) {
            input.value = "";
            correctType.innerText++;
            wordsLeft.innerText--;
            // Check if Array empty
            if (words.length == 0) {
               result.style.display = "block";
               result.innerText = "Well Done!";
               wordsLeft.innerText = "0";
               scoring();
            } else {
               input.value = "";
               everyTurn();
            }
         } else {
            result.style.display = "block";
            result.classList.add("loss");
            result.innerText = "Game Over!";
            scoring();
         }
      }
   }, 1000);
}
// Manage The Score
function scoring() {
   const scoreText = document.querySelector(
      "footer>p:last-of-type"
   ).textContent;
   // console.log(scoreText);
   addScoreToArr(scoreText);
}
// Manage LocalStorage array
function addScoreToArr(name) {
   const objScore = {
      id: Date.now(),
      theScore: name,
   };
   arrScore.push(objScore);
   window.localStorage.setItem("scores", JSON.stringify(arrScore));
}
// Prep the score time Stamp
function getStamp(dd) {
   let timePoint = new Date(dd);
   let day = timePoint.getDate();
   let month = timePoint.getMonth();
   let year = timePoint.getFullYear();
   let hour = timePoint.getHours();
   hour = hour < 10 ? `0${hour}` : hour;
   let minute = timePoint.getMinutes();
   minute = minute < 10 ? `0${minute}` : minute;
   let second = timePoint.getSeconds();
   second = second < 10 ? `0${second}` : second;
   return `${day}_${month}_${year} - ${hour}:${minute}:${second}`;
}
// Append score elements
function appendScoreEle(x) {
   let p = document.createElement("p");
   p.innerText = `${getStamp(x.id)} - ${x.theScore}`;
   p.classList.add("hide");
   scoreDiv.append(p);
}
// Score Button
scoreBtn.addEventListener("click", openScore);
scoreBtn.addEventListener("click", hideClr);
function openScore() {
   for (const child of scoreDiv.children) {
      child.classList.toggle("hide");
   }
}
// Hide score clear button
function hideClr() {
   clr.classList.toggle("hide");
}
// Clear Score Button
clr.addEventListener("click", clearScore);
function clearScore() {
   localStorage.removeItem("scores");
   scoreDiv.innerText = "";
   clr.classList.toggle("hide");
}
// Info button
infoBtn.addEventListener("click", openInfo);
function openInfo() {
   pInfo.forEach((p) => {
      p.classList.toggle("hide");
   });
}
// Hide both menus with Escape
document.addEventListener("keyup", (e) => {
   if (e.key === "Escape") {
      hideClr();
      openScore();
      openInfo();
   }
});
