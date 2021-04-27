const movementDisplay = document.getElementById("movement");
const game = document.getElementById("game");
const shipImage = document.getElementById("shipImage");
const spaceWraith = document.getElementById("spaceWraith");
const zap = document.getElementById("zap");
const ray = document.getElementById("ray");
const blasts = document.getElementById("blasts");
let player;
let wraith;
let pew;
let rayz;

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

let arrBlasts = [];
function shipBlasts(e) {
  if (e.keyCode === 32) {
    console.log("pew");
    blasts.textContent = "pewwwwww";
    // fire!
    pew = new Blasts(player.x + 30, player.y, 25, 25);
    console.log(pew);
    arrBlasts.push(pew);

    // wait to reload
    setTimeout(function () {
      blasts.textContent = "";
    }, 300);
  }
}

// wraiths setup
class Wraith {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 1.5; // update as wraiths get destroyed?
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
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 4; x++) {
      wraith = new Wraith(x * 70 + 500, y * 70, 40, 40);
      arrWraith.push(wraith);
    }
  }
}

moreWraiths(); // why am i calling this here and why doesn't it work in the game loop?

// wraith movement
function wraithMovement() {
  arrWraith.forEach((wraith) => {
    if (wraith.y >= 340) {
      arrWraith.forEach((wraith) => (wraith.speed = -1.5));
    } else if (wraith.y <= 10) {
      arrWraith.forEach((wraith) => (wraith.speed = 1.5));
    }
  });
}
// have them start moving faster after 5 are killed
// have them start moving towards player after 10 are killed

// wraith ray NOT WORKING
class Ray {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 4;
  }

  render() {
    ctx.drawImage(ray, (this.x -= this.speed), this.y, this.width, this.height);
  }
}

// **** TO DO ****
let arrRay = [];
function wraithRay(e) {
  // need some randomness here
  if (e.keyCode === 32) {
    // fire!
    rayz = new Ray(player.x - 30, player.y, 25, 25);
    arrRay.push(rayz);

    // wait to reload
    setTimeout(function () {
      blasts.textContent = "";
    }, 300);
  }
}

// hit detection (hitting wraiths)
function hitWraith() {
  for (let i = 0; i < arrWraith.length; i++) {
    for (let j = 0; j < arrBlasts.length; j++) {
      if (
        arrBlasts[j].y + pew.height > arrWraith[i].y &&
        arrBlasts[j].y < arrWraith[i].y + wraith.height &&
        arrBlasts[j].x + pew.width > arrWraith[i].x &&
        arrBlasts[j].x < arrWraith[i].x + wraith.width
      ) {
        arrWraith.splice(i, 1);
        arrBlasts.splice(j, 1);
      }
    }
  }
}

// (arrBlasts[j].x > arrWraith[i].x && arrBlasts[j].y < arrWraith[i].y)

// player loses

// game loop
function gameLoop() {
  clearCanvas();
  movementDisplay.textContent = `X: ${player.x} 
  Y: ${player.y}`;
  player.render();
  arrWraith.forEach((wraith) => wraith.render());
  wraithMovement();
  arrBlasts.forEach((pew) => pew.render());
  arrRay.forEach((rayz) => rayz.render()); //  NOT WORKING
  hitWraith();
}

// event listeners
document.addEventListener("DOMContentLoaded", function () {
  player = new Ship(10, 200, 30, 30);
  wraith = new Wraith(500, 100, 50, 50);
  document.addEventListener("keydown", shipMove);
  document.addEventListener("keydown", shipBlasts);
  const runGame = setInterval(gameLoop, 60); // what does this do?
});

// restart
