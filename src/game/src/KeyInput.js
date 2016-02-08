/*

This manages all of the key controls the player inputs into the game

*/

import Keys from '../constants/keys';

export default {
  controlledPlayer: null,

  handleKeydown: function (e) {
    var keyCode = e.keyCode;

    switch(keyCode) {
      case Keys.down:
        controlledPlayer.downKeyDown = true;
        break;
      case Keys.up:
        controlledPlayer.upKeyDown = true;
        break;
      case Keys.right:
        controlledPlayer.rightKeyDown = true;
        break;
      case Keys.left:
        controlledPlayer.leftKeyDown = true;
        break;
    }
  },

  handleKeyup: function (e) {
    var keyCode = e.keyCode;

    switch(keyCode) {
      case Keys.down:
        controlledPlayer.downKeyDown = false;
        break;
      case Keys.up:
        controlledPlayer.upKeyDown = false;
        break;
      case Keys.right:
        controlledPlayer.rightKeyDown = false;
        break;
      case Keys.left:
        controlledPlayer.leftKeyDown = false;
        break;
    }
  }
}