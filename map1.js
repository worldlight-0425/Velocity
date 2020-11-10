var scoreBoard = document.querySelector('.scoreBoard');
var leftSide = document.getElementById('leftside')
var rightSide = document.getElementById('rightside')
document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") {
    moveLeft();
  }
  if (event.key === "ArrowRight") {
    moveRight();
  }
});
var character = document.getElementById("character");

function moveLeft() {
  let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  left -= 100;
  if (left >= 0) {
    character.style.left = left + "px";
  }
}

function moveRight() {
  let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  left += 100;
  if (left < 300) {
    character.style.left = left + "px";
  }
}
var block = document.getElementById("block");
var counter = 0;
block.addEventListener('animationiteration', () => {
  var random = Math.floor(Math.random() * 3);
  left = random * 100;
  block.style.left = left + "px";
  counter++;
});
setInterval(function () {
  var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
  if (characterLeft == blockLeft && blockTop < 500 && blockTop > 300) {
    show();
    block.style.animation = "none";
    rightSide.style.animation = 'none';
    leftSide.style.animation = 'none';
    audio.pause();
    document.getElementById('crash').play();
  } else {
    document.getElementById("scoreSpan").innerHTML = counter;
    document.getElementById("ScoreSpan").innerHTML = counter;

  }

}, 1);
hide();

function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ('0' + String(hex)).substr(-2)
  }
  return '#' + c() + c() + c();
}
enemy.style.backgroundColor = randomColor();

function hide() {
  scoreBoard.style.display = 'none';
}

function show() {
  scoreBoard.style.display = 'block';
}