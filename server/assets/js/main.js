console.log('Welcome to broc');


var width = 800;
var height = 600;

var heroWidth = 20;
var heroHeight = 20;

var centerX = width / 2;
var centerY = height / 2;

var gameLoopInterval = null;
var fps = 1000 / 60; // 60 fps

var GRAVITY = 300;
var lastTime = null;

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

  hero = new Player();
  lastTime = Date.now();

  gameLoopInterval = setInterval(gameLoop, fps);
};

var draw = function() {
  ctx.clearRect(0, 0, width, height); // clear the canvas

  ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
};

var update = function() {
  var deltaTime = (Date.now() - lastTime) / 1000;

  console.log(deltaTime);

  hero.yDir += GRAVITY * deltaTime;

  if (hero.y + hero.yDir * deltaTime + hero.height < height) {
    hero.y += hero.yDir * deltaTime;
  } else {
    hero.y = height - hero.height;
  }

  lastTime = Date.now();
};

var gameLoop = function() {
  draw();
  update();
};


init();
