import React, { useState, useEffect } from 'react';

export function Game(props) {
  const { type } = props;
  console.log('Game');
  const getRandom = (max = 10, but) => {
    const random = Math.floor(Math.random() * max);
    if (but !== undefined && random === but) {
      return getRandom(max);
    }
    if (random === 0) {
      debugger;
    }
    return random;
  };
  const [operand0, setOperand0] = useState(getRandom(10, type === '÷' ? 0 : undeined));
  const [operand1, setOperand1] = useState(getRandom(10));
  const [result, setResult] = useState('');
  const [correctness, setCorrectness] = useState(null);
  const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);

  useEffect(() => {
    console.log({ correctness });
    if (!correctness) {
      return;
    }
    setCorrectAnswersCounter(correctAnswersCounter + 1);
    const timeout = setTimeout(() => {
      console.log('timout');
      nextTask();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [correctness]);

  // while (operand0 === 0) {
  //   setOperand0(getRandom(10));
  // }

  const handleChange = (event) => {
    setResult(event.target.value);
  };

  const checkResult = (event) => {
    // console.log(event);
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
    setOperand0(getRandom(10, type === '÷' ? 0 : undeined));
    setOperand1(getRandom(10));
    // while (operand0 === 0) {
    //   setOperand0(getRandom(10));
    // }
    setResult('');
  };

  return (<>
      <h3>Кількість правильних відповідей: {correctAnswersCounter}</h3>
      {type === '÷' && (
        <div>{`${operand0 * operand1} ${type} ${operand0}`}</div>
      )}
      {(type === '*' || type === '+') && (
        <div>{`${operand0} ${type} ${operand1}`}</div>
      )}
      {type === '-' && (
        <div>{`${operand0 + operand1} ${type} ${operand0}`}</div>
      )}
      <br />
      <button onClick={nextTask}>Інше завдання</button>
      <form onSubmit={checkResult}>
        <label htmlFor="result">Обери результат </label>
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
          className={`${correctness && 'correct'} ${
            correctness === false && 'incorrect'
          }`}
          value="Перевірка"
        />
        <div>Швидкі відповіді</div>
        <div class="answer-buttons-container" onClick={handleChange}>
          {[...Array(100).keys()].map((x, i) => (
            <input type="submit" value={i} />
          ))}
        </div>
      </form>
    </>
  );
}

// const App = <GameDevision />;
// ReactDOM.render(App, document.getElementById("root"));
