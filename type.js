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
   "Programming",
   "Code",
   // "Javascript",
   // "Town",
   // "Country",
   // "Testing",
   // "Youtube",
   // "Linkedin",
   // "Twitter",
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
let randoWord;
let doorWedge = false;

input.onpaste = function () {
   return false;
};
// Default lvl and timeLeft values
let defaultLvl = "Easy";
lvl.innerText = defaultLvl;
timeLeft.forEach((t) => {
   t.innerText = lvls[defaultLvl];
});

// Update Level and time
selectBox.onchange = function () {
   timeLeft.forEach((w) => {
      w.innerText = lvls[selectBox.value];
   });
   lvl.innerText = selectBox.value;
};
// score count From
scoreFrom.innerText = words.length;

// Click start
startBtn.addEventListener("click", everyTurn);
startBtn.addEventListener("click", addInitialTime);

function addInitialTime() {
   if (!doorWedge) {
      footerTime.innerText = lvls[selectBox.value] + 2;
   }
   doorWedge = true;
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
            } else {
               everyTurn();
            }
         } else {
            result.style.display = "block";
            result.classList.add("loss");
            result.innerText = "Game Over!  reload";
         }
      }
   }, 1000);
}
