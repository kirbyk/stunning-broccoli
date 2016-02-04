/*

This file contains the keybinding controls for a local player

*/

import Constants from '../../constants';
import React from 'react';

export default class PlayerControls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rightKeyDown: false,
      leftKeyDown: false,
    };
  }

  saySomething() {
    console.log("Rgfdbjxfkbafd");
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