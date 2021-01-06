
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var newGame = true;

$(document).keydown(function() {
  if (newGame === true) {
    gamePattern = [];
    nextSequence();
    currentAttemptNumber += 1;
  }
  newGame = false;
})

// Show the max level achieved and the current attempt number
var maxLevelAchieved = 0;
var currentAttemptNumber = 0;
$(".max-level").text(maxLevelAchieved);
$(".current-attempt").text(currentAttemptNumber);


function checkAnswer(currentLevel) {
  var latestClickIndex = userClickedPattern.length;
  if (userClickedPattern[latestClickIndex-1] !== gamePattern[latestClickIndex-1]) {
    $("body").addClass("game-over");
    var sound = new Audio("sounds/wrong.mp3"); // Use this :D; but whyyyy?
    sound.play();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over! Press Any Key to Replay");
    newGame = true;
    level = 0;
  } else if (latestClickIndex === currentLevel) {
    setTimeout(nextSequence, 700);
  }
}

// Append the user-clicked color to userClickedPattern
$("div.btn").click(function(event) {
  var userChosenColour = event.target.id;// note this means that clicking on any button will lead to h1 being green
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(level);
});

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
