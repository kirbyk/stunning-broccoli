/*
Broccoli

This class defines a basic moving object and its required methods
*/

export default class Sprite {
  constructor(x,y) {
    this.x = x;
    this.y = y;

    this.xDir = 0;
    this.yDir = 0;

    this.rotation = 0;
    this.rotationDir = 0;

    this.color = '#000000';
  }
}