import Constants from '../constants';
import Player from './Player';
import React from 'react';
import { Surface } from 'react-canvas';
import { connect } from 'react-redux';
import { tick } from '../actions';


class Game extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setInterval(() => {
      this.props.dispatch(tick());
    }, Constants.fps);
  }

  render() {
    return (
      <Surface width={Constants.canvasWidth} height={Constants.canvasHeight} left={0} top={0}>
        <Player />
      </Surface>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Game);
