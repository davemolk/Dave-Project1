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

// firing at asteroids

// asteroid setup

class Wraith {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.alive = true;
  }

  render() {
    ctx.drawImage(spaceWraith, this.x, this.y, this.width, this.height);
  }
}

// swap out color for an image at some point

// asteroid array

// asteroid movement

// game loop
function gameLoop() {
  clearCanvas();
  movementDisplay.textContent = `X: ${player.x} 
  Y: ${player.y}`;
  player.render();
  wraith.render();
}

// hit detection (hitting asteroids)

// event listeners
document.addEventListener("DOMContentLoaded", function () {
  player = new Ship(10, 200, 30, 30);
  wraith = new Wraith(700, 100, 30, 30);
  document.addEventListener("keydown", shipMove); // feels like I should move this out
  const runGame = setInterval(gameLoop, 60); // what does this do?
});

// restart
