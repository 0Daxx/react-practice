// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Button } from "./pages/Button";
import { CheckBox } from "./pages/CheckBox";
import { DarkTheme } from "./pages/DarkTheme";
import { ProgressBar } from "./pages/ProgressBar";
// import { useState } from 'react';
import { Timer } from "./pages/Timer";

import dayjs from "dayjs";
import { useState, useEffect, Fragment } from "react";
// PROJECT
import { SubmissionForm } from "./projects/SubmissionForm";
import { Joke } from "./projects/Joke";
import { Validate } from "./projects/Validate";
import { Dice } from "./projects/Dice";
import { BgChanger } from "./projects/BgChanger";
import { RandomPassword } from "./projects/RandomPassword";
import CurrencyConverter from "./projects/CurrencyConverter";
import { TicTacToe } from "./projects/TicTacToe";

function App() {
  // const [count, setCount] = useState(0);
  function Clock() {
    const [time, setTime] = useState("");

    useEffect(() => {
      setInterval(() => {
        setTime(dayjs().format("HH:mm:ss"));
      }, 1000);
    }, []);
    return (
      <>
        <h3>TIME : </h3>
        <p>{time}</p>
      </>
    );
  }

  // Q3
  // The Auto-Saving Input 💾: Create a text area where, after the user stops typing for 2 timeLeft, a "Saved!" message appears automatically using a timeout.

  function UserInput() {
    const [userinput, setUserinput] = useState("");

    function saveUserInput(event) {
      setUserinput(event.target.value);
    }
    return (
      <div>
        <input type="text" onChange={saveUserInput} />
        <p> text you typed : {userinput}</p>
      </div>
    );
  }
  function Count() {
    // save in local storage
    const [count, setCount] = useState(0);
    function saveCount(event) {
      setCount(Number(event.target.value));
      localStorage.setItem("count", count);
    }
    return (
      <div>
        <button onClick={saveCount}>Count</button>
        <p>Count : {localStorage.getItem("count")}</p>
      </div>
    );
  }

  function ClickMe() {
    return (
      <>
        <button
          onClick={() => {
            console.log("clicked");
          }}>
          Click me{" "}
        </button>
      </>
    );
  }

  

  return (
    <>
      <Clock />
      {/* < Joke /> */}
      {/* < Validate /> */}
      {/* < Dice /> */}
      {/* < BgChanger /> */}
      {/* < CurrencyConverter  /> */}

      {/* <  RandomPassword /> */}
      < TicTacToe />
      {/* <   /> */}
      {/* < SubmissionForm /> */}
    </>
  );
}

export default App;
/* 

Challenge 5: Circular progress bar (SVG-based)


*/
