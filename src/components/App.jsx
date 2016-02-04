import Constants from '../constants';
import Player from './Player/Player';
import React from 'react';
import { Surface } from 'react-canvas';


export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Surface width={Constants.canvasWidth} height={Constants.canvasHeight} left={0} top={0}>
        <Player />
      </Surface>
    );
  }

}
