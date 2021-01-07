
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var newGame = true;
var maxLevelAchieved = 0;
var currentAttemptNumber = 0;

// Show the initial level achieved
$(".max-level").text(maxLevelAchieved);
$(".current-attempt").text(currentAttemptNumber);

// When a round has ended, allow player to click on any key to restart another round
$(document).keydown(function() {
  if (newGame === true) {
    gamePattern = [];
    nextSequence();
    currentAttemptNumber += 1;
    $(".current-attempt").text(currentAttemptNumber)
  }
  newGame = false;
})


function checkAnswer(currentLevel) {
  var latestClickIndex = userClickedPattern.length;
  if (userClickedPattern[latestClickIndex-1] !== gamePattern[latestClickIndex-1]) {

    // Make game over sound
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();

    // Add visual aspects of game over
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over! Press Any Key to Replay");

    // Update the max level achieved board
    if (level > maxLevelAchieved) {
      maxLevelAchieved = level;
      $(".max-level").text(maxLevelAchieved);
    }

    // Reinitializing variables for a new round
    level = 0;
    newGame = true;

  } else if (latestClickIndex === currentLevel) {
    setTimeout(nextSequence, 700);
  }
}

// Append the user-clicked color to the array userClickedPattern
$("div.btn").click(function(event) {
  var userChosenColour = event.target.id;
  // note this means that clicking on any button will lead to h1 being green
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  // Check the current user click against the correct computer click ONLY the game is not over
  if (newGame === false) {
    checkAnswer(level);
  }
})

// Define what should happen after a player finishes a round
function nextSequence() {
  // Empty the user's pattern of the previous round;
  userClickedPattern = [];

  // Update the level
  level++;
  $("h1").text("Level " + level);

  // Make PC choose a random color, then play its sound and show it being pushed
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonChosen = buttonColours[randomNumber];
  buttonPressAnimation(buttonChosen);

  // Append the generated button click to gamePattern
  gamePattern.push(buttonChosen);
  console.log(gamePattern);
}

// Add sound and fading effects when clicked
var allButtons = document.querySelectorAll(".btn");
for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function() {
    var buttonChosen = this.classList[1];
    buttonPressAnimation(buttonChosen);
 });
}

// Define the animations that should occur when either the player or the computer
//   clicks a button
function buttonPressAnimation(button) {
  // Sound effect
  var sound = new Audio("sounds/" + button + ".mp3");
  sound.play();

  // Button click animation
  $("div#" + button).addClass("pressed");
  setTimeout(function() {
    $("div#" + button).removeClass("pressed");
  }, 200);
}
