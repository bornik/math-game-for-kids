import React, { useState, useEffect } from 'react';
import { Score } from '../score/score';

export function Game(props) {
  const { type } = props;
  const {inputNumbers} = props
  console.log('Game');
  const getRandom = (max = 10, but, inputNumbers) => {
    const random = Math.floor(Math.random() * max);
    if (inputNumbers && !inputNumbers.includes(random)) {
      return getRandom(max, but, inputNumbers);
    }
    if (but !== undefined && random === but) {
      return getRandom(max, but);
    }
    if (random === 0) {
      debugger;
    }
    return random;
  };
  const [operand0, setOperand0] = useState(
    getRandom(10, type === '÷' ? 0 : undefined, inputNumbers)
  );
  const [operand1, setOperand1] = useState(getRandom(10, 0, inputNumbers));
  const [result, setResult] = useState('');
  const [correctness, setCorrectness] = useState(null);
  const [correctAnswersCounter, setCorrectAnswersCounter] = useState(
    +window.localStorage.getItem('correctAnswersCounter') || 0
  );

  useEffect(() => {
    console.log({ correctness });
    if (!correctness) {
      return;
    }
    const incrementedCorrectAnswers = correctAnswersCounter + 1;
    setCorrectAnswersCounter(incrementedCorrectAnswers);
    window.localStorage.setItem(
      'correctAnswersCounter',
      incrementedCorrectAnswers
    );
    const timeout = setTimeout(() => {
      console.log('timout');
      nextTask();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [correctness]);

  const handleChange = (event) => {
    setResult(event.target.value);
  };

  const checkResult = (event) => {
    switch (type) {
      case '-':
      case '÷': {
        setCorrectness(operand1 === +result);
        break;
      }
      case '*': {
        setCorrectness(operand0 * operand1 === +result);
        break;
      }
      case '+': {
        setCorrectness(operand0 + operand1 === +result);
        break;
      }
      default:
    }
    event.preventDefault();
  };

  const nextTask = () => {
    setCorrectness(null);
    setOperand0(getRandom(10, type === '÷' ? 0 : undefined, inputNumbers));
    setOperand1(getRandom(10, 0, inputNumbers));
    setResult('');
    console.log({ operand1 }, { type }, { operand0 });
  };

  return (
    <>
      <h4>
        <Score className="block" scorePoints={correctAnswersCounter} />
      </h4>
      <p>Кількість правильних відповідей: {correctAnswersCounter}</p>
      <h3><span className={`${correctness && 'correct'} ${
            correctness === false && 'incorrect'
          }`}>
        {type === '÷' && `${operand0 * operand1} ${type} ${operand0}`}
        {(type === '*' || type === '+') && `${operand0} ${type} ${operand1}`}
        {type === '-' && `${operand0 + operand1} ${type} ${operand0}`}
      </span></h3>
      
      
      <form onSubmit={checkResult}>
      <div>Швидкі відповіді</div>
        <div className="answer-buttons-container" onClick={handleChange}>
          {[...Array(100).keys()].map((x, i) => (
            <input type="submit" key={i} value={i} />
          ))}
        </div>
        <label htmlFor="result">Якщо потрібно, можешь ввести результат тут </label>
        <input
          type="number"
          value={result}
          onChange={handleChange}
          type="text"
          id="result"
        />
        &nbsp;
        <input
          type="submit"
          id="checkResult"
          
          value="Перевірка"
        />
        
      </form>
      <button className='block' onClick={nextTask}>Інше завдання</button>
      <h3>Якщо тобі цікаво, можеш поразглядати Таблицю Піфагора</h3>
      <p>З нею простіше запам'ятати множення</p>
      <a href='https://skysmart.ru/articles/mathematic/tablica-umnozheniya'>
      <img src='https://bandaumnikov.ru/media/blog/kak-uchit-tablicu-umnojeniya/pifagor-table.jpg'/>
      </a>
    </>
  );
}
