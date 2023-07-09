/* 
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm run test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/

// Option 2
// function generateWinningNumber(){
//     return Math.floor(Math.random() * 100) + 1; // generate random number between 0 to 100
// }

// function shuffle(array){
//     for (let i = array.length - 1; i > 0; i--)
//     {
//         // Pick a random index from 0 to i inclusive
//         let j = Math.floor(Math.random() * (i + 1));
 
//         // Swap array[i] with the element
//         // at random index
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// class Game {
//     constructor(){
//         this.playersGuess = null;
//         this.pastGuesses = [];
//         this.winningNumber = generateWinningNumber();
//     }

//     difference(){
//         return Math.abs(this.playersGuess - this.winningNumber);
//     }
    
//     isLower(){
//         if (this.playersGuess < this.winningNumber) {return true;}
//         else {return false;}
//     }

//     playersGuessSubmission(number){
//         this.playersGuess = number;
//         if(this.playersGuess < 1 || this.playersGuess > 100 || isNaN(this.playersGuess)){throw ("That is an invalid guess.");}
       
//         return this.checkGuess();
//     }

//     checkGuess(){
//         if(this.playersGuess === this.winningNumber){return "You Win!";}
//         if(this.pastGuesses.includes(this.playersGuess)) {return "You have already guessed that number.";}
//         if(this.playersGuess!==this.winningNumber || !this.pastGuesses.includes(this.playersGuess)){this.pastGuesses.push(this.playersGuess);}
//         if(this.playersGuess === 5){return "You Lose.";}
//         if(this.difference() < 10){return "You're burning up!";} 
//         else if(this.difference() < 25){return "You're lukewarm.";}
//         else if(this.difference() < 50){return "You're a bit chilly.";}
//         else{return "You're ice cold!";}
//     }

//     newGame(){
//         return new Game();
//     }

//     provideHint(){
//         let hintArray = new Array(3);
//         hintArray[0] = this.winningNumber;

//         for(let i=0; i<hintArray.length; i++){
//             if(isNaN(hintArray[i])){
//                 hintArray[i] = generateWinningNumber();
//             }
//         }
//         shuffle(hintArray);
//         return hintArray;
//     }
// }
// console.log(array);
// console.log(shuffle(array));


// Option 1:

// Global variables
let randomNum;
let score = 10;
let highscore = 0;

function changeMsg(text) {
  const message = document.getElementById("message");
  message.textContent = text;
}

function disableGame() {
  const submitBtn = document.getElementById("submitBtn");
  const inputUser = document.getElementById("inputUser");
  const restartBtn = document.getElementById("restartBtn");
  
  submitBtn.disabled = true;
  inputUser.disabled = true;
  restartBtn.disabled = false;
}

function checkGuess() {
  const inputUser = document.getElementById("inputUser");
  const guess = parseInt(inputUser.value);
  
  if (isNaN(guess) || guess < 1 || guess > 100) {
    changeMsg("Please enter a valid number.");
    return;
  }
  
  if (guess === randomNum) {
    changeMsg("You guessed the correct number!");
    document.body.style.backgroundColor = "green";
    disableGame();
    
    if (score > highscore) {
      highscore = score;
      document.getElementById("highscore").textContent = highscore;
    }
  } else {
    if (score === 0) {
      changeMsg("Game over! You lost.");
      disableGame();
      document.body.style.backgroundColor = "red";
    } else {
      if (guess > randomNum) {
        changeMsg("Too high!");
      } else {
        changeMsg("Too low!");
      }
      score--;
      document.getElementById("score").textContent = score;
    }
  }
  
  inputUser.value = "";
  inputUser.focus();
}

function restartGame() {
  randomNum = Math.floor(Math.random() * 100) + 1;
  score = 10;
  document.getElementById("score").textContent = score;
  document.getElementById("message").textContent = "";
  document.body.style.backgroundColor = "";
  
  const submitBtn = document.getElementById("submitBtn");
  const inputUser = document.getElementById("inputUser");
  const restartBtn = document.getElementById("restartBtn");
  
  submitBtn.disabled = false;
  inputUser.disabled = false;
  restartBtn.disabled = true;
  
  inputUser.value = "";
  inputUser.focus();
}

document.getElementById("submitBtn").addEventListener("click", checkGuess);

document.getElementById("restartBtn").addEventListener("click", restartGame);

window.addEventListener("load", restartGame);
