console.log('Welcome to broc');


var width = 800;
var height = 600;

var heroWidth = 20;
var heroHeight = 20;
var heroJump = -300;
var heroSpeed = 250;

var rightKeyDown = false;
var leftKeyDown = false;

var centerX = width / 2;
var centerY = height / 2;

var gameLoopInterval = null;
var fps = 1000 / 60; // 60 fps

var GRAVITY = 300;
var lastTime = null;

var keyCodes = {
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

var Player = function() {
  this.x = centerX;
  this.y = centerY;

  this.width = heroWidth;
  this.height = heroHeight;

  this.yDir = 0;
};

var init = function() {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  document.body.appendChild(canvas);

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);

  hero = new Player();
  lastTime = Date.now();

  gameLoopInterval = setInterval(gameLoop, fps);
};

var handleKeydown = function(e) {
  var keyCode = e.keyCode;

  console.log(keyCode);

  switch(keyCode) {
    case keyCodes.up:
    case keyCodes.space:
      hero.yDir = heroJump;
      break;
    case keyCodes.right:
      rightKeyDown = true;
      break;
    case keyCodes.left:
      leftKeyDown = true;
      break;
  }
};

var handleKeyup = function(e) {
  var keyCode = e.keyCode;

  console.log(keyCode);

  switch(keyCode) {
    case keyCodes.right:
      rightKeyDown = false;
      break;
    case keyCodes.left:
      leftKeyDown = false;
      break;
  }
};

var draw = function() {
  ctx.clearRect(0, 0, width, height); // clear the canvas

  ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
};

var update = function() {
  var deltaTime = (Date.now() - lastTime) / 1000;

  hero.yDir += GRAVITY * deltaTime;

  if (hero.y + hero.yDir * deltaTime + hero.height < height) {
    hero.y += hero.yDir * deltaTime;
  } else {
    hero.y = height - hero.height;
  }

  if (rightKeyDown) {
    if (hero.x + heroSpeed * deltaTime + hero.width < width) {
      hero.x += heroSpeed * deltaTime;
    } else {
      hero.x = width - hero.width;
    }
  }

  if (leftKeyDown) {
    if (hero.x - heroSpeed * deltaTime > 0) {
      hero.x -= heroSpeed * deltaTime;
    } else {
      hero.x = 0;
    }
  }

  lastTime = Date.now();
};

var gameLoop = function() {
  draw();
  update();
};



init();
