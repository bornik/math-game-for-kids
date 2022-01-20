import React, { Component } from 'react';
import { render } from 'react-dom';
import {Game} from './Game';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <h1>Привіт, любей друже!</h1>
        <h2>Хочеш погратися в математику?</h2>
        <GameDevision />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
