import React, { useState } from 'react';
import { Game } from './Game';

export const Landing = () => {
  const [operation, setOperation] = useState('÷');
  const [userName, setUserName] = useState(window.localStorage.getItem('userName'));
  const [userNameConfirmed, setUserNameConfirmed] = useState(!!userName);

  const handleUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  const confirmUserName = () => {
    window.localStorage.setItem('userName', userName)
    setUserNameConfirmed(!!userName);
  };

  return (
    <div>
      <h1>Привіт, {userName || 'любий друже'}!</h1>

      {!userNameConfirmed ? (
        <>
          <form onSubmit={confirmUserName}>
            <label>
              Як тебе звуть?<br/>
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
          <Game type={operation} />
        </>
      )}
    </div>
  );
};
