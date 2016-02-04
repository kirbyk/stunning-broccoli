import Constants from '../constants';
import Player from './Player';
import React from 'react';
import { Surface } from 'react-canvas';
import { connect } from 'react-redux';
import { tick } from '../actions';


class Game extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    console.log('fuck');
    setInterval(() => {
      this.props.dispatch(tick());
      // this.forceUpdate(); // this makes the error go forever
    }, Constants.fps);
  }

  render() {
    console.log(this.props);

    return (
      <Surface width={Constants.canvasWidth} height={Constants.canvasHeight} left={0} top={0}>
        <Player />
      </Surface>
    );
  }

}

export default connect()(Game);
