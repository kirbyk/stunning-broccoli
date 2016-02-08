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

    // deltaTime: 0,
    // lastTime: Date.now(),

    this.upKeyDown = false;
    this.downKeyDown = false;
    this.rightKeyDown = false;
    this.leftKeyDown = false;

    // this._handleKeydown = this._handleKeydown.bind(this);
    // this._handleKeyup = this._handleKeyup.bind(this);

    // document.addEventListener('keydown', this._handleKeydown);
    // document.addEventListener('keyup', this._handleKeyup);
  }

  update (deltaTime) {


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

  componentDidMount() {
    setInterval(() => {
      this.setState({
        ...this.state,
        deltaTime: (Date.now() - this.state.lastTime) / 1000,
        yDir: this.state.yDir + (Constants.gravity * this.state.deltaTime)
      });

      this._setY(this.state.yPos + (this.state.yDir * this.state.deltaTime));

      var playerVector = Constants.playerSpeed * this.state.deltaTime;

      if (this.state.rightKeyDown) {
        this._setX(this.state.xPos + playerVector);
      }

      if (this.state.leftKeyDown) {
        this._setX(this.state.xPos - playerVector);
      }

      this.setState({
        lastTime: Date.now()
      });

      this.forceUpdate();
    }, Constants.fps);
  }

  render() {
    var style = this._getStyle();

    return (
      <Circle style={style} />
    );
  }

  _getStyle() {
    return {
      xPos: this.state.xPos,
      yPos: this.state.yPos,
      radius: this.state.radius,
      color: this.state.color
    };
  }

  _setX(x) {
    var safeWidth = Constants.canvasWidth - this.state.radius;

    if (x > safeWidth) {                      // prevent going too right
      this.setState({
        ...this.state,
        xPos: safeWidth
      });
    } else if (x < Constants.playerRadius) {  // prevent going too left
      this.setState({
        ...this.state,
        xPos: Constants.playerRadius
      });
    } else {
      this.setState({                         // base case
        ...this.state,
        xPos: x
      });
    }
  }

  _setY(y) {
    var safeHeight = Constants.canvasHeight - this.state.radius;

    if (y > safeHeight) {                     // prevent going too low
      this.setState({
        ...this.state,
        yPos: safeHeight
      });
    } else if (y < Constants.playerRadius) {  // prevent going too high
      this.setState({
        ...this.state,
        yPos: Constants.playerRadius
      });
    } else {                                  // base case
      this.setState({
        ...this.state,
        yPos: y
      });
    }
  }

  _handleKeydown(e) {
    var keyCode = e.keyCode;
    var keyCodes = Constants.keyCodes;

    switch(keyCode) {
      case keyCodes.up:
      case keyCodes.space:
        this.setState({
          ...this.state,
          yDir: Constants.playerJump
        });
        break;
      case keyCodes.right:
        this.setState({
          ...this.state,
          rightKeyDown: true
        });
        break;
      case keyCodes.left:
        this.setState({
          ...this.state,
          leftKeyDown: true
        });
        break;
    }
  }

  _handleKeyup(e) {
    var keyCode = e.keyCode;
    var keyCodes = Constants.keyCodes;

    switch(keyCode) {
      case keyCodes.right:
        this.setState({
          ...this.state,
          rightKeyDown: false
        });
        break;
      case keyCodes.left:
        this.setState({
          ...this.state,
          leftKeyDown: false
        });
        break;
    }
  }

}
