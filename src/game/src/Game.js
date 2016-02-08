/*
Broccoli

This class contains the basic game loop

*/

import Constants from '../constants';
import Player from './Player';
import KeyInput from './KeyInput';

export default class Game {

  // headers
  // update(){}
  // draw(){}

  constructor() {
    // setting up the canvas
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.hero = new Player(Constants.gameWidth/2, Constants.gameHeight/2);

    KeyInput.controlledPlayer = this.hero;
    // set up key handling
    document.addEventListener('keydown', KeyInput.handleKeydown);
    document.addEventListener('keyup', KeyInput.handleKeyup);

    this.lastTime = Date.now();
  }

  update(deltaTime) {
    this.hero.update(deltaTime);
  }

  start() {
    this.lastTime = Date.now();

    // start the game loop going
    this.gameLoopInterval = setInterval(this.gameloop, Constants.fps);
  }

  gameloop() {
    var currentTime = Date.now();
    var deltaTime = (currentTime - this.lastTime)/1000;

    this.update(deltaTime);

    this.draw();

    this.lastTime = Date.now();
  }

  draw() {
    ctx.clearRect(0, 0, Constants.frameWidth, Constants.frameHeight);

    this.hero.draw(this.ctx);
  }
}