import React, { useState } from 'react';
import { Game } from '../game/game';
import { version } from "../package.json";
import './landing.scss';

export const Landing = () => {
  const [operation, setOperation] = useState('÷');
  const [userName, setUserName] = useState(window.localStorage.getItem('userName'));
  // const [score, setScore] = useState(
  //   window.localStorage.getItem('userName')
  // );
  const [userNameConfirmed, setUserNameConfirmed] = useState(!!userName);

  const handleUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  const confirmUserName = () => {
    window.localStorage.setItem('userName', userName);
    setUserNameConfirmed(!!userName);
  };

  const handleRenameClick = () => {
    setUserNameConfirmed(false);
  };

  const handleScoreChange = () => {

  }

  return (
    <>
    <header className='center'>Територія гри. {version}</header>
      <h1>
        Привіт, {userName || 'любий друже'}
        {userNameConfirmed && <button className='button-icon' onClick={handleRenameClick}>✏️</button>}
        !
        
      </h1>

      {!userNameConfirmed ? (
        <>
          <form onSubmit={confirmUserName}>
            <label>
              Як тебе звуть?
              <br />
              <input value={userName} onChange={handleUserNameInput} />
            </label>
            <button onClick={confirmUserName}>OK</button>
          </form>
        </>
      ) : (
        <>
          <h2>Хочеш погратися в математику?</h2>
          
          <label htmlFor="operator">Обери операції, які тобі довподоби:</label>
          &nbsp;
          <select
            value={operation}
            onChange={handleOperationChange}
            id="operator"
          >
            <option value="÷">÷</option>
            <option value="*">*</option>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
          <Game type={operation} onScoreChange={handleScoreChange} />
        </>
      )}
    <footer className='center'>ігри в математику© Версія: {version}</footer>
    </>
  );
};
