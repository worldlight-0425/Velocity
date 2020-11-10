var scoreSpan = document.getElementById('scoreSpan');
var scoreBoard = document.querySelector('.scoreBoard');
var leftSide = document.getElementById('leftside')
var rightSide = document.getElementById('rightside')
const score = document.querySelector('.score');
const gameArea = document.querySelector('.gameArea');

console.log(gameArea);


let player = {
    speed: 20,
    score: 0,
    btnspeed: 50
};


let keys = {
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false
}

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

var btncar = document.getElementById('car');

function moveUp() {
    let road = gameArea.getBoundingClientRect();
    if (player.y > (road.top + 60)) {
        player.y -= player.btnspeed
    }
}

function moveDown() {
    let road = gameArea.getBoundingClientRect();
    if (player.y < (road.bottom - 99)) {
        player.y += player.btnspeed
    }
}

function moveLeft() {
    let road = gameArea.getBoundingClientRect();
    if (player.x > 0) {
        player.x -= player.btnspeed
    }
}

function moveRight() {
    let road = gameArea.getBoundingClientRect();
    if (player.x < (road.width - 50)) {
        player.x += player.btnspeed
    }
}

function keydown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyup(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))

}

function moveLanes() {
    let lane = document.querySelectorAll('.lane');

    lane.forEach(function (item) {

        if (item.y >= 800) {
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + 'px';
    })
}

function gamePlay() {
    // console.log('hey i am clicked');

    let road = gameArea.getBoundingClientRect();
    // console.log(road);

    let car = document.querySelector('.car');

    if (player.start) {

        moveLanes();
        moveEnemyCar(car);

        if (keys.ArrowUp && player.y > (road.top + 60)) {
            player.y -= player.speed
        }
        if (keys.ArrowDown && player.y < (road.bottom - 99)) {
            player.y += player.speed
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed
        }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);
        player.score++;
        score.innerText = 'score:' + player.score;
        scoreSpan.innerText = player.score;
    }
}

function endGame() {
    show();
    player.start = false;
    audio.pause();
    document.getElementById('crash').play();
    rightSide.style.animation = 'none';
    leftSide.style.animation = 'none';
}

function moveEnemyCar(car) {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {

        if (isCollide(car, item)) {
            // console.log('BooM hIt');
            endGame();
        }

        if (item.y >= 800) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + 'px';
        }

        item.y += player.speed;
        item.style.top = item.y + 'px';
    })
}

function start() {
    hide();
    gameArea.innerHTML = '';

    player.start = true;
    player.score = 0;

    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {

        let roadLane = document.createElement('div');
        roadLane.setAttribute('class', 'lane');
        roadLane.y = (x * 150);
        roadLane.style.top = roadLane.y + 'px';
        gameArea.appendChild(roadLane);

    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {

        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + 'px';
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
        gameArea.appendChild(enemyCar);

    }
}

function randomColor() {
    function c() {

        let hex = Math.floor(Math.random() * 256).toString(16);
        return ('0' + String(hex)).substr(-2)
    }
    return '#' + c() + c() + c();
}

function hide() {
    scoreBoard.style.display = 'none';
}

function show() {
    scoreBoard.style.display = 'block';
}