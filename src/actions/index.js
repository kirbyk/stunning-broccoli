import * as types from '../constants/ActionTypes';


export function leftKeyDown() {
  return {
    type: types.LEFT_KEY_DOWN
  };  
};

export function upKeyDown() {
  return {
    type: types.UP_KEY_DOWN
  };  
};

export function rightKeyDown() {
  return {
    type: types.RIGHT_KEY_DOWN
  };  
};

export function downKeyDown() {
  return {
    type: types.DOWN_KEY_DOWN
  };  
};


export function leftKeyUp() {
  return {
    type: types.LEFT_KEY_UP
  };  
};

export function upKeyUp() {
  return {
    type: types.UP_KEY_UP
  };  
};

export function rightKeyUp() {
  return {
    type: types.RIGHT_KEY_UP
  };  
};

export function downKeyUp() {
  return {
    type: types.DOWN_KEY_UP
  };  
};


export function tick() {
  return {
    type: types.TICK
  };
};
