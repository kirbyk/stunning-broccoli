import * as types from '../constants/ActionTypes';
import Constants from '../constants';


const defaultState = {
  player: {
    xPos: Constants.canvasWidth / 2,
    yPos: Constants.canvasHeight / 2,

    yDir: 0,

    color: '#000000'
  },

  deltaTime: 0,
  lastTime: Date.now(),

  rightKeyDown: false,
  leftKeyDown: false
};

export default function game(state = defaultState, action) {
  switch(action.type) {

    case types.LEFT_KEY_DOWN:
      return {
	...state,
	leftKeyDown: true
      };

    case types.UP_KEY_DOWN:
      return {
        ...state,
        player: {
          ...state.player,
          yDir: Constants.playerJump
        }
      };

    case types.RIGHT_KEY_DOWN:
      return {
	...state,
	rightKeyDown: true
      };

    case types.DOWN_KEY_DOWN:
      break;

    case types.LEFT_KEY_UP:
      return {
	...state,
	leftKeyDown: false
      };

    case types.UP_KEY_UP:
      break;

    case types.RIGHT_KEY_UP:
      return {
	...state,
	rightKeyDown: false
      };

    case types.DOWN_KEY_UP:
      break;

    case types.TICK:
      var deltaTime = (Date.now() - state.lastTime) / 1000;
      var yDir = state.player.yDir + (Constants.gravity * state.deltaTime);

      var playerVector = Constants.playerSpeed * state.deltaTime;

      let xPos = null;

      if (state.rightKeyDown) {
        xPos = _calcX(state.player.xPos + playerVector);
      }

      if (state.leftKeyDown) {
        xPos = _calcX(state.player.xPos - playerVector);
      }

      const player = {
        ...state.player,
        yDir: yDir,
        xPos: xPos,
        yPos: _calcY(state.player.yPos + (yDir * deltaTime))
      };

      return {
        ...state,
        deltaTime: deltaTime,
        player: player,
        lastTime: Date.now()
      };

    default:
      return state;
  }

};

function _calcX(x) {
  var safeWidth = Constants.canvasWidth - Constants.playerRadius;

  if (x > safeWidth) {
    return safeWidth;
  } else if (x < Constants.playerRadius) {
    return Constants.playerRadius;
  } else {
    return x;
  }
}

function _calcY(y) {
  var safeHeight = Constants.canvasHeight - Constants.playerRadius;

  if (y > safeHeight) {
    return safeHeight;
  } else if (y < 0) {
    return 0;
  } else {
    return y;
  }
}
