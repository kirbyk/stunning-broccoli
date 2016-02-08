/*
Broccoli

The Player class - many of these in one online game
*/

import Constants from '../constants';
import Sprite from './Sprite';

export default class Player extends Sprite {

  constructor(x,y) {
    super(x,y);

    this.radius = Constants.playerRadius;
    // this.color = '#000000';


    this.upKeyDown = false;
    this.downKeyDown = false;
    this.rightKeyDown = false;
    this.leftKeyDown = false;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#5AC8FB';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#52EDC7';
    ctx.stroke();
  }

  update (deltaTime) {
    // update moving speed based on current keys
    if(this.upKeyDown) {
      this.yDir -= Constants.playerSpeed * deltaTime;
    }
    if(this.downKeyDown) {
      this.yDir += Constants.playerSpeed * deltaTime;
    }
    if(this.leftKeyDown) {
      this.xDir -= Constants.playerSpeed * deltaTime;
    }
    if(this.rightKeyDown) {
      this.xDir += Constants.playerSpeed * deltaTime;
    }

    mapCollisions(deltaTime);

    applyFriction(deltaTime);

    // update player position
    this.y += this.yDir * deltaTime;
    this.x += this.xDir * deltaTime;
  }

  applyFriction(deltaTime) {
    // slow the player down gradually
    if(this.xDir > 0) { // X
      this.xDir -= friction * deltaTime
      if(this.xDir < 0) {
        this.xDir = 0;
      }
    }
    else if(this.xDir < 0) { 
      this.xDir += friction * deltaTime
      if(this.xDir > 0) {
        this.xDir = 0;
      }
    }
    if(this.yDir > 0) { // Y
      this.yDir -= friction * deltaTime
      if(this.yDir < 0) {
        this.yDir = 0;
      }
    }
    else if(this.yDir < 0) { 
      this.yDir += friction * deltaTime
      if(this.yDir > 0) {
        this.yDir = 0;
      }
    }
  }

  playerMapCollisions (deltaTime) {
    // left side map collision
    if(this.xDir > 0 && this.x + this.radius + this.xDir * deltaTime < 0) {
      this.x = this.radius;
      this.xDir = 0;
    }
    // right side map collision
    else if(this.xDir < 0 && this.x + this.radius + this.xDir * deltaTime > Constants.gameWidth) {
      this.x = Constants.gameWidth - this.radius;
      this.xDir = 0;
    }

    // top side map collision
    if(this.yDir < 0 && this.y + this.radius + this.yDir * deltaTime < 0) {
      this.y = this.radius;
    }
    // bottom side map collision
    else if(this.y + this.radius + this.yDir * deltaTime > Constants.gameHeight) {
      this.y = Constants.gameHeight - this.radius;
    }
  }
}
