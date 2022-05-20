import React, { useState } from 'react';
import { Game } from '../game/game';
import { version } from '../package.json';
import './landing.scss';

const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  // document.body.header.style.backgroundColor = "#" + randomColor;
  // color.innerHTML = "#" + randomColor;
};

// genNew.addEventListener("click", setBg);

export const Landing = () => {
  const [operation, setOperation] = useState('*');
  const [userName, setUserName] = useState(
    window.localStorage.getItem('userName')
  );
  const [inputNumbers, setInputNumbers] = useState([ 2, 3, 5]);

  setBg();
  const [userNameConfirmed, setUserNameConfirmed] = useState(!!userName);

  const handleUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  }; 
 
  const handleInputNumbersChange = (event) => {
    debugger; 
    const selectedNumber = Number(event.target.value);
    inputNumbers.includes(selectedNumber)
      ? setInputNumbers(inputNumbers.filter((el) => el !== selectedNumber))
      : setInputNumbers([...inputNumbers, selectedNumber]);
  };
  const confirmUserName = () => {
    window.localStorage.setItem('userName', userName);
    setUserNameConfirmed(!!userName);
  };

  const handleRenameClick = () => {
    setUserNameConfirmed(false);
  };

  const handleScoreChange = () => {};

  return (
    <>
      <header className="center">ігри в математику v{version}</header>
      <h1>
        Привіт {userName || 'любий друже'}
        {userNameConfirmed && (
          <button className="button-icon" onClick={handleRenameClick}>
            ✏️
          </button>
        )}
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
          <div>
            <label htmlFor="numbers">Обери цифри з якими хочешь грати:</label>
            &nbsp;
            <div onClick={handleInputNumbersChange}>
              {[...Array(10).keys()].map((x, i) => (
                <input
                  size="1"
                  type="submit"
                  key={i}
                  value={i}
                  className={inputNumbers.includes(i) && 'selected'}
                />
              ))}
            </div>
          </div>
          <Game type={operation} onScoreChange={handleScoreChange} inputNumbers={inputNumbers}/>
        </>
      )}
      <footer className="center">ігри в математику© Версія: {version}</footer>
    </>
  );
};
