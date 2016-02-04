import React from 'react';
import Game from './Game.jsx';
import reducers from '../reducers';

import { Provider } from 'react-redux';
import { createStore } from 'redux'


const store = createStore(reducers);

export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    console.log(this.props);

    return (
      <Provider store={store}>
        {() => <Game />}
      </Provider>
    );
  }

}
