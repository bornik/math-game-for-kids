import React from 'react';
import { render } from 'react-dom'
import {Landing} from './Landing';
import './style.css';
import ReactGA from 'react-ga';

ReactGA.initialize('G-9N289HG8YQ');
ReactGA.pageview(window.location.pathname + window.location.search);
console.log(` ${process.env.REACT_APP_VERSION}`)
const App = () => {
  return <Landing/>
}
render(<App />, document.getElementById('root'));