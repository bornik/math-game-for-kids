import React, { useState, useEffect } from 'react'

export function Game(props) {
  console.log( 'GameDevision' );
  const getRandom = (max = 10, but) => {
    const random = Math.floor(Math.random() * max);
    if (but !== undefined && random === but) {
      return getRandom(max)
    }
    if (random === 0) {
      debugger
    }
    return random;
  };
  const [multiplier0, setMultiplier0] = useState(getRandom(10, 0));
  const [multiplier1, setMultiplier1] = useState(getRandom(10));
  const [result, setResult] = useState("");
  const [correctness, setCorrectness] = useState(null);
  const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);

  useEffect(() => {
    console.log({ correctness });
    if (!correctness) {
      return;
    }
    setCorrectAnswersCounter(correctAnswersCounter + 1);
    const timeout = setTimeout(() => {
      console.log("timout");
      nextTask();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [correctness]);

  // while (multiplier0 === 0) {
  //   setMultiplier0(getRandom(10));
  // }

  const handleChange = (event) => {
    setResult(event.target.value);
  };

  const checkResult = (event) => {
    // console.log(event);
    setCorrectness(multiplier1 === +result);
    event.preventDefault();
  };

  const nextTask = () => {
    setCorrectness(null);
    setMultiplier0(getRandom(10, 0));
    setMultiplier1(getRandom(10));
    // while (multiplier0 === 0) {
    //   setMultiplier0(getRandom(10));
    // }
    setResult("");
  };

  return (
    <>
      <h3>Правильно відповів разів: {correctAnswersCounter}</h3>
      <div>{`${multiplier0 * multiplier1} ÷ ${multiplier0}`}</div>
      <form onSubmit={checkResult}>
        <label htmlFor="result">Обери результат </label>
        <input type="number" value={result} onChange={handleChange} type="text" id="result" /> 
        &nbsp;
        <input
          type="submit"
          id="checkResult"
          className={`${correctness && "correct"} ${
            correctness === false && "incorrect"
          }`}
          value="Перевірка"
        />
        <div className="answers-buttons" onClick={handleChange}>
          <input type="submit" value="1"/>
          <input type="submit" value="2"/>
          <input type="submit" value="3"/>
          <input type="submit" value="4"/>
          <input type="submit" value="5"/>
          <input type="submit" value="6"/>
          <input type="submit" value="7"/>
          <input type="submit" value="8"/>
          <input type="submit" value="9"/>
          <input type="submit" value="0"/>
        </div>
      </form>
      <button onClick={nextTask}>Нове завдання</button>
    </>
  );
}

// const App = <GameDevision />;
// ReactDOM.render(App, document.getElementById("root"));

