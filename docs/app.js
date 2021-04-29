// DOM-related globals
const movementDisplay = document.getElementById("movement");
const game = document.getElementById("game");
const shipImage = document.getElementById("shipImage");
const spaceWraith = document.getElementById("spaceWraith");
const zap = document.getElementById("zap");
const ray = document.getElementById("ray");
const blasts = document.getElementById("blasts");
const score = document.getElementById("score");
const instructions = document.getElementById("instructions");
let gameState = document.getElementById("game-state");
const hasta = document.getElementById("hasta");
const bleeds = document.getElementById("bleeds");
const hell = document.getElementById("hell");
const last = document.getElementById("last");
const scream = document.getElementById("scream");
const row = 4;
const col = 5;
let points = 0;
let runGame;

// player globals
let player;
let arrBlasts = [];

// sounds
let hastaToggle = true;
let screamToggle = true;
let bleedsToggle = true;
let hellToggle = true;
let lastToggle = true;

// wraith globals
let wraith;
let arrWraith = [];
let arrRay = [];

// canvas setup
const ctx = game.getContext("2d");

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

// *********** SHIP ************
// ship setup
class Ship {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.alive = true;
  }

  render() {
    ctx.drawImage(shipImage, this.x, this.y, this.width, this.height);
  }
}

// ship movement
function shipMove(e) {
  if (e.keyCode === 38 && player.y > 0) {
    player.y -= 10;
  } else if (e.keyCode === 40 && player.y < 370) {
    player.y += 10;
  }
}

// ship blast class
class Blasts {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 15;
  }

  render() {
    ctx.drawImage(zap, (this.x += this.speed), this.y, this.width, this.height);
  }
}

// ship blasts
function shipBlasts(e) {
  if (e.keyCode === 32) {
    blasts.textContent = "pewwwwww";
    // fire!
    arrBlasts.push(new Blasts(player.x + 30, player.y, 25, 25));

    // erase 'pew'
    setTimeout(function () {
      blasts.textContent = "";
    }, 500);
  }
}

function arnie() {
  if (arrWraith.length === 19 && screamToggle) {
    scream.play();
    screamToggle = false;
  }
  if (arrWraith.length === 15 && bleedsToggle) {
    bleeds.play();
    bleedsToggle = false;
  }
  if (arrWraith.length === 10 && hellToggle) {
    hell.play();
    hellToggle = false;
  }
  if (arrWraith.length === 5 && lastToggle) {
    last.play();
    lastToggle = false;
  }
}

// *********** WRAITHS ************
// wraiths setup
class Wraith {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 2;
    this.alive = true;
  }

  render() {
    ctx.drawImage(
      spaceWraith,
      this.x,
      (this.y += this.speed),
      this.width,
      this.height
    );
  }

  fire() {
    if (this.alive) {
      arrRay.push(new Ray(this.x - 30, this.y, 20, 20));
    }
  }
}

// wraith array
function moreWraiths() {
  for (let y = 0; y < col; y++) {
    for (let x = 0; x < row; x++) {
      wraith = new Wraith(x * 70 + 500, y * 70, 40, 40);
      arrWraith.push(wraith);
    }
  }
}

// wraith movement
function wraithMovement() {
  arrWraith.map((wraith) => {
    if (wraith.y >= 340) {
      if (arrWraith.length <= 10) {
        arrWraith.map((wraith) => {
          wraith.speed = -10;
          wraith.y -= 1;
          wraith.x -= 25;
        });
      } else if (arrWraith.length <= 15) {
        arrWraith.map((wraith) => (wraith.speed = -5));
      } else arrWraith.map((wraith) => (wraith.speed = -2));
    } else if (wraith.y <= 10) {
      if (arrWraith.length <= 10) {
        arrWraith.map((wraith) => {
          wraith.speed = 10;
          wraith.y += 1;
          wraith.x -= 25;
        });
      } else if (arrWraith.length <= 15) {
        arrWraith.map((wraith) => (wraith.speed = 5));
      } else arrWraith.map((wraith) => (wraith.speed = 2));
    }
  });
}

// wraith ray
class Ray {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
  }

  render() {
    ctx.drawImage(ray, (this.x -= this.speed), this.y, this.width, this.height);
  }
}

// wraith blasts
function wraithRay() {
  let blastFest = 0.95;
  let randomWraith = Math.floor(Math.random() * 20);
  if (arrWraith.length <= 12 && arrWraith.length > 8) blastFest = 0.85;
  if (arrWraith.length <= 8) blastFest = 0.75;
  if (arrWraith.length <= 4) blastFest = 0.6;
  if (arrWraith.length <= 2) blastFest = 0.2;
  if (arrWraith[randomWraith] !== undefined) {
    if (Math.random() > blastFest) arrWraith[randomWraith].fire();
  }
}

// *********** HIT DETECTION AND LOSING CONDITIONS ************
// hitting wraiths
function hitWraith() {
  for (let i = 0; i < arrWraith.length; i++) {
    for (let j = 0; j < arrBlasts.length; j++) {
      if (arrWraith[i] !== undefined) {
        if (
          arrBlasts[j].y + 25 > arrWraith[i].y &&
          arrBlasts[j].y < arrWraith[i].y + wraith.height &&
          arrBlasts[j].x + 25 > arrWraith[i].x &&
          arrBlasts[j].x < arrWraith[i].x + wraith.width
        ) {
          arrWraith[i].alive = false;
          arrWraith.splice(i, 1);
          arrBlasts.splice(j, 1);
          points += 50;
          score.textContent = points;
        }
      }
    }
  }
}

// wraith touches ship
function touchShip() {
  for (let i = 0; i < arrWraith.length; i++) {
    if (
      player.y + player.height > arrWraith[i].y &&
      player.y < arrWraith[i].y + wraith.height &&
      player.x + player.width > arrWraith[i].x &&
      player.x < arrWraith[i].x + wraith.width
    ) {
      player.alive = false;
      blasts.textContent = "Space wraithed! Touched by wraith.";
      loser();
    }
  }
}

// wraith ray touches ship
function rayShip() {
  for (let i = 0; i < arrRay.length; i++) {
    if (
      player.y + player.height > arrRay[i].y &&
      player.y < arrRay[i].y + 20 &&
      player.x + player.width > arrRay[i].x &&
      player.x < arrRay[i].x + 20
    ) {
      player.alive = false;
      blasts.textContent = "Space wraithed! Blasted to smithereens.";
      loser();
    }
  }
}

// wraith reaches x = 0
function touchX() {
  for (let i = 0; i < arrWraith.length; i++) {
    if (arrWraith[i].x <= -wraith.width) {
      player.alive = false;
      blasts.textContent = "Space wraithed! A wraith got past you.";
      loser();
    }
  }
}

// *********** ENDING AND RESETTING ************
// game conditions
function clearCanvas() {
  ctx.clearRect(0, 0, game.width, game.height);
}

function winner() {
  if (arrWraith.length === 0 && player.alive === true) {
    instructions.textContent = "You Won!";
    arrRay.length = 0;
    arrBlasts.length = 0;
    if (hastaToggle) hasta.play();
    hastaToggle = false;
    gameState.textContent === "Click to Begin!";
  }
}

function loser() {
  if (player.alive === false) {
    arrWraith.length = 0;
    gameState.textContent = "Click to Reset";
    clearInterval(runGame); // stops/freezes game
    clearCanvas(); //clears screen
  }
}

function reset() {
  player.alive = true;
  arrBlasts.length = 0;
  arrWraith.length = 0;
  moreWraiths();
  arrRay.length = 0;
  points = 0;
  score.textContent = "Score";
  instructions.textContent = "Up/Down Arrows to Move, Spacebar to Shoot"; // may be obsolete now
  blasts.textContent = "";
  gameState.textContent === "Click to Begin!";
}

// *********** GAME LOOP ************
function gameLoop() {
  clearCanvas();
  movementDisplay.textContent = `X: ${player.x} 
  Y: ${player.y}`;
  player.render();
  arnie();
  arrBlasts.map((blast) => blast.render());
  arrWraith.map((wraith) => wraith.render());
  wraithMovement();
  wraithRay();
  arrRay.map((ray) => ray.render());
  hitWraith();
  // losing the game
  touchShip();
  touchX();
  rayShip();
  loser();

  // winning
  winner();
}

// *********** EVENT LISTENERS ************
document.addEventListener("DOMContentLoaded", function () {
  player = new Ship(10, 200, 30, 30);
  moreWraiths();
  document.addEventListener("keydown", shipMove);
  document.addEventListener("keydown", shipBlasts);
  gameState.addEventListener("click", function () {
    if (gameState.textContent === "Click to Begin!") {
      runGame = setInterval(gameLoop, 60);
      gameState.textContent = "Click to Reset";
    } else if (gameState.textContent === "Click to Reset") {
      gameState.textContent = "Click to Begin!";
      clearInterval(runGame); // stops/freezes game
      clearCanvas(); //clears screen
      reset();
    }
  });
});
