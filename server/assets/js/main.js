console.log('Welcome to broc');


var canvasWidth = 800;
var canvasHeight = 600;

var heroWidth = 20;
var heroHeight = 20;
var heroJump = -300;
var heroSpeed = 250;

var rightKeyDown = false;
var leftKeyDown = false;

var centerX = canvasWidth / 2;
var centerY = canvasHeight / 2;

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

Player.prototype.draw = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.setX = function(x) {
  var safeWidth = canvasWidth - this.width;

  if (x > safeWidth) {
    this.x = safeWidth;
  } else if(x < 0) {
    this.x = 0;
  } else {
    this.x = x;
  }
};

Player.prototype.setY = function(y) {
  var safeHeight = canvasHeight - this.height;

  if (y > safeHeight) {
    this.y = safeHeight;
  } else if(y < 0) {
    this.y = 0;
  } else {
    this.y = y;
  }
};

Player.prototype.update = function() {
  deltaTime = (Date.now() - lastTime) / 1000;

  this.yDir += GRAVITY * deltaTime;

  this.setY(this.y + (this.yDir * deltaTime));

  var heroVector = heroSpeed * deltaTime;

  if (rightKeyDown) {
    this.setX(this.x + heroVector);
  }

  if (leftKeyDown) {
    this.setX(this.x - heroVector);
  }

  lastTime = Date.now();
};

var init = function() {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  document.body.appendChild(canvas);

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);

  hero = new Player();
  lastTime = Date.now();

  gameLoopInterval = setInterval(gameLoop, fps);
};

var handleKeydown = function(e) {
  var keyCode = e.keyCode;

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

  // console.log(keyCode);

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
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear the canvas

  hero.draw();
};

var update = function() {
  hero.update();
};

var gameLoop = function() {
  draw();
  update();
};



init();
