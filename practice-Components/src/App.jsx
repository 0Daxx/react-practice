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

  

  return (
    <>
      {/* <Timer /> */}
      {/* <UserInput /> */}
      <Clock />
      < DarkTheme />
      {/* <CheckBox /> */}
      {/* < Button/> */}
      {/* <h1>hello </h1> */}
      {/* <ProgressBar /> */}
    </>
  );
}

export default App;
/* 

Challenge 5: Circular progress bar (SVG-based)


*/
