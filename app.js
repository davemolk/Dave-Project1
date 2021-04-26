const movementDisplay = document.getElementById("movement");
const game = document.getElementById("game");
const shipImage = document.getElementById("shipImage");
const spaceWraith = document.getElementById("spaceWraith");
let player;
let wraith;

// canvas setup
const ctx = game.getContext("2d");

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

function clearCanvas() {
  ctx.clearRect(0, 0, game.width, game.height);
}

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

// put onscreen
// let player = new Ship(500, 500, 30, 30);

// ship movement
function shipMove(e) {
  if (e.keyCode === 38 && player.y > 0) {
    player.y -= 10;
  } else if (e.keyCode === 40 && player.y < 370) {
    player.y += 10;
  }
  // try this as e.key, documentation says others deprecated https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
}

// ship blasts

// firing at wraiths

// wraiths setup

class Wraith {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 1.5;
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
}

// wraith array
let arrWraith = [];

function moreWraiths() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 4; j++) {
      wraith = new Wraith(i * 35 + 33, j * 35 + 15, 30, 30);
      arrWraith.push(wraith);
    }
  }
}
// wraith movement
moreWraiths();
console.log(arrWraith);

// game loop
function gameLoop() {
  clearCanvas();
  movementDisplay.textContent = `X: ${player.x} 
  Y: ${player.y}`;
  player.render();
  wraith.render();
}

// hit detection (hitting wraithss)

// event listeners
document.addEventListener("DOMContentLoaded", function () {
  player = new Ship(10, 200, 30, 30);
  wraith = new Wraith(700, 100, 30, 30);
  document.addEventListener("keydown", shipMove); // feels like I should move this out
  const runGame = setInterval(gameLoop, 60); // what does this do?
});
// should this be in a
// restart
