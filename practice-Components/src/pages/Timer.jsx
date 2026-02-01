import { useEffect } from "react";
import { useState } from "react";

export function Timer() {
  

  // Q2 The Countdown Timer ⏳: Create a timeLeft where a user inputs a number of timeLeft, clicks "Start," and it counts down to zero.
  const [timeLeft, setTimeleft] = useState("");
  const [isrunning, setIsrunning] = useState(false);

  useEffect(() => {
    // If an effect controls a process (like a timer), it should not depend on the value it is modifying.
    if (!isrunning) return;
    const intervalId = setInterval(() => {
      setTimeleft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsrunning(false);
          return 0;
        }
        return prev - 1;
      });
    },100 );
  },[isrunning]);

  function saveSecond(event) {
    setTimeleft(Number(event.target.value));
  }

  function startTimer() {
    setIsrunning(true);
  }

  function resetTimer() {
    setTimeleft("");
    setIsrunning(false);
  }

  return (
    <>
      

      <input
        onChange={saveSecond}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            console.log(event);
            startTimer();
          }
        }}
        type="number"
        placeholder="Time in timeLeft "
        value={timeLeft}
      />

      <p>{timeLeft} seconds left </p>
      <button onClick={startTimer} disabled={isrunning || timeLeft <= 0}>
        Start
      </button>

      <button onClick={resetTimer} disabled={!isrunning}>
        Reset{" "}
      </button>
    </>
  );
}

/* 
The Countdown Timer ⏳: Create a timeLeft where a user inputs a number of timeLeft, clicks "Start," and it counts down to zero.

The Auto-Saving Input 💾: Create a text area where, after the user stops typing for 2 timeLeft, a "Saved!" message appears automatically using a timeout.
*/
