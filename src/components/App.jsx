import React from 'react';
import Game from './Game.jsx';
import reducers from '../reducers';

import { Provider } from 'react-redux';
import { createStore } from 'redux'


let store = createStore(reducers);

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        {() => <Game />}
      </Provider>
    );
  }

}
