const movementDisplay = document.getElementById("movement");
const game = document.getElementById("game");
const shipImage = document.getElementById("shipImage");
let hero; // define within so probably delete here?
let asteroids; // define within so probably delete here?

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
let player = new Ship(500, 500, 30, 30);
// ship movement
function shipMove(e) {
  if (e.keyCode === 38) {
    player.y -= 10;
  } else if (e.keyCode === 40) {
    player.y += 10;
  }
  // try this as e.key, documentation says others deprecated https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
}

// ship blasts

// firing at asteroids

// asteroid setup

function Asteroid(x, y, color, width, height) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.width = width;
  this.height = height;
  this.alive = true;
  this.render = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}
// swap out color for an image at some point

// asteroid array

// asteroid movement

// hit detection (hitting asteroids)

// lots of functions

// restart
