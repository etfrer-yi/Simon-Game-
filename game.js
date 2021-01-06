
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var newGame = true;

$(document).keydown(function() {
  if (newGame === true) {
    gamePattern = [];
    nextSequence();
  }
  newGame = false;
})

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
  var randomChosenColour = buttonColours[randomNumber];
  var sound = new Audio("sounds/" + randomChosenColour + ".mp3");
  sound.play();
  // $("div#" + randomChosenColour).fadeOut().fadeIn();

  $("div#" + randomChosenColour).addClass("pressed");
  setTimeout(function () {
    $("div#" + randomChosenColour).removeClass("pressed");
  }, 200);

  // Append the generated button click to gamePattern
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
}

// Add sound and fading effects when clicked
var allButtons = document.querySelectorAll(".btn");

for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function() {
    var button = this.classList[1];
    var sound = new Audio("sounds/" + this.classList[1] + ".mp3"); // Use this :D; but whyyyy?
    sound.play();
    // $("div#" + this.classList[1]).fadeOut().fadeIn();
    $("div#" + this.classList[1]).addClass("pressed");
    setTimeout(function() {
      $("div#" + button).removeClass("pressed");
    }, 200);

 });
}
