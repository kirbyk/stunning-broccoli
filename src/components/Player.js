import Constants from '../constants';
import React from 'react';
import { Circle } from 'react-canvas';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Player extends React.Component {

  constructor(props) {
    super(props);

    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleKeyup = this._handleKeyup.bind(this);

    document.addEventListener('keydown', this._handleKeydown);
    document.addEventListener('keyup', this._handleKeyup);
  }

  render() {
    var style = this._getStyle();

    return (
      <Circle style={style} />
    );
  }

  _getStyle() {
    return {
      xPos: this.props.player.xPos,
      yPos: this.props.player.yPos,
      radius: Constants.playerRadius,
      color: this.props.player.color
    };
  }

  _handleKeydown(e) {
    var keyCode = e.keyCode;
    var keyCodes = Constants.keyCodes;

    switch(keyCode) {
      case keyCodes.up:
      case keyCodes.space:
        return this.props.dispatch(actions.upKeyDown());

      case keyCodes.right:
        return this.props.dispatch(actions.rightKeyDown());

      case keyCodes.left:
        return this.props.dispatch(actions.leftKeyDown());
    }
  }

  _handleKeyup(e) {
    var keyCode = e.keyCode;
    var keyCodes = Constants.keyCodes;

    switch(keyCode) {
      case keyCodes.right:
        return this.props.dispatch(actions.rightKeyUp());

      case keyCodes.left:
        return this.props.dispatch(actions.leftKeyUp());
    }
  }

}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Player);
