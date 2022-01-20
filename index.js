import React, { useState } from 'react';
import { render } from 'react-dom';
import {Game} from './Game';
import './style.css';

const App = () => {
  const [operation, setOperation] = useState('÷')

  const handleOperationChange = (event) => {
    setOperation(event.target.value)
  }
  
    return (
      <div>
        <h1>Привіт, любий друже!</h1>
        <h2>Хочеш погратися в математику?</h2>
        <label htmlFor='operator'>Обери операції, які тобі довподоби:</label>&nbsp;
        <select value={operation} onChange={handleOperationChange} id='operator'>
          <option value='÷'>÷</option>
          <option value='*'>*</option>
          <option value='+'>+</option>
          <option value='-'>-</option>
        </select>
        <Game type={operation}/>
      </div>
    );

}

render(<App />, document.getElementById('root'));
