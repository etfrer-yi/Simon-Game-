// VARIABLE DEFINITIONS ========================================================


let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let newGame = true;
let maxLevelAchieved = 0;
let currentAttemptNumber = 0;


// FUNCTION DEFINITIONS ========================================================


// checkAnswer(currentLevel) consumes a natural number corresponding to the
//   current level and checks the latest player move againsthe latest computer
//   generated move. Depending on whether they match and whether the move is the
//   last one for this level, the function can will terminate the game and
//   update the maxLevelAchieved, do nothing if they match, or usher into the
//   next level if the length of the userClickdPattern matches the currentLevel.
function checkAnswer(currentLevel) {
  let latestClickIndex = userClickedPattern.length;

  // If the last user click does not correspond to the right pattern by the PC
  if (userClickedPattern[latestClickIndex-1] !== gamePattern[latestClickIndex-1]){
    console.log("Not equal");
    endGame();
  }

  // If the last user click does correspond to the right pattern by the PC
  else if (latestClickIndex === currentLevel) {
    setTimeout(nextSequence, 700);
  }
}

// endGame() details what should happen when the user pattern no longer matches
//   the game pattern. It plays the game over sound, displays the message and
//   the red screen flash associated with the game end, and
//   may update the maxLevelAchieved.
function endGame() {
  // Update the max level achieved board
  if (level > maxLevelAchieved) {
    maxLevelAchieved = level;
    $(".max-level").text(maxLevelAchieved);
  }

  // Make game over sound
  let sound = new Audio("sounds/wrong.mp3");
  sound.play();

  // Add visual aspects of game over
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  $("h1").text("Game Over! Press Any Key to Replay");

  // Reinitializing letiables for a new round
  level = 0;
  newGame = true;
}


// nextSeqquence() produces what should happen when the game ushers into the
//   next level. It empties the pattern of player moves, updates the level,
//   and generates a new computer move that is appended to the gamePattern.
function nextSequence() {
  // Empty the user's pattern of the previous round;
  userClickedPattern = [];

  // Update the level
  level++;
  $("h1").text("Level " + level);

  // Make PC choose a random color, then play its sound and show it being pushed
  let randomNumber = Math.floor(Math.random() * 4);
  let buttonChosen = buttonColours[randomNumber];
  buttonPressAnimation(buttonChosen);
  console.log("The generated color is " + buttonChosen);

  // Append the generated button click to gamePattern
  gamePattern.push(buttonChosen);
  console.log("The gamePattern is " + gamePattern);
}


// buttonPressAnimation(button) consumes a string associated with any of the
//   four button colours. It produces the animation (sound and click effect)
//   associated with clicking that particular button.
function buttonPressAnimation(button) {
  // Sound effect
  let sound = new Audio("sounds/" + button + ".mp3");
  sound.play();

  // Button click animation
  $("div#" + button).addClass("pressed");
  setTimeout(function() {
    $("div#" + button).removeClass("pressed");
  }, 200);
}

// Add sound and fading effects when clicked
let allButtons = document.querySelectorAll(".btn");
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function() {
    let buttonChosen = this.classList[1];
    buttonPressAnimation(buttonChosen);
 });
}


// EVENT LISTENERS & TEXT QUERY SELECTORS ======================================


// Show the initial level achieved
$(".max-level").text(maxLevelAchieved);
$(".current-attempt").text(currentAttemptNumber);


// When a round has ended, allow player to click on any key to restart another
//   round
$(document).keydown(function() {
  if (newGame === true) {
    gamePattern = [];
    nextSequence();
    currentAttemptNumber += 1;
    $(".current-attempt").text(currentAttemptNumber);
    console.log("New GAME");
    newGame = false;
  }
})


// Append the user-clicked color to the array userClickedPattern
$("div.btn").click(function(event) {
  let userChosenColour = event.target.id;
  // note this means that clicking on any button will lead to h1 being green

  userClickedPattern.push(userChosenColour);

  console.log("The userClickedPattern is " + userClickedPattern);
  console.log("The gamePattern when clicked is " + gamePattern);

  // Check the current user click against the correct computer click ONLY the
  //   game is not over
  if (newGame === false) {
    checkAnswer(level);
  }
})
