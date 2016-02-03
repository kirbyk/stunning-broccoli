import Constants from '../constants';
import React from 'react';
import { Circle } from 'react-canvas';


export default class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      xPos: Constants.canvasWidth / 2,
      yPos: Constants.canvasHeight / 2,

      yDir: 0,

      radius: Constants.playerRadius,
      color: '#000000',

      deltaTime: 0,
      lastTime: Date.now(),

      rightKeyDown: false,
      leftKeyDown: false,
    };

    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleKeyup = this._handleKeyup.bind(this);

    document.addEventListener('keydown', this._handleKeydown);
    document.addEventListener('keyup', this._handleKeyup);
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

    if (x > safeWidth) {
      this.setState({
        ...this.state,
        xPos: safeWidth
      });
    } else if (x < Constants.playerRadius) {
      this.setState({
        ...this.state,
        xPos: Constants.playerRadius
      });
    } else {
      this.setState({
        ...this.state,
        xPos: x
      });
    }
  }

  _setY(y) {
    var safeHeight = Constants.canvasHeight - this.state.radius;

    if (y > safeHeight) {
      this.setState({
        ...this.state,
        yPos: safeHeight
      });
    } else if (y < 0) {
      this.setState({
        ...this.state,
        yPos: 0
      });
    } else {
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
