import { useEffect, useState } from "react";

// TIP :  public should never appear in the URL    // const [dice1, setDice1] = useState("../../public/images/dice/1.png");
export function Dice() {
  const [dice1, setDice1] = useState("one");
  const [dice2, setDice2] = useState("one");
  const [autoRoll, setAutoRoll] = useState(false);

  function rollDice() {
    const imagesObj = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
    };
    const num1 = Math.floor(Math.random() * 6) + 1;
    const num2 = Math.floor(Math.random() * 6) + 1;
    setDice1(imagesObj[num1]);
    setDice2(imagesObj[num2]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoRoll) return;
      rollDice();
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRoll]);

  return (
    <>
      <div>
        <img src={`/images/dice/${dice1}.png`} alt="" />
        <img src={`/images/dice/${dice2}.png`} alt="" />
      </div>
      <button onClick={rollDice}> Roll Dice </button>
      <button onClick={() => setAutoRoll(!autoRoll)}>
        {" "}
        {autoRoll ? "Stop" : "Start"}{" "}
      </button>
    </>
  );
}

/**
/**
  Features to add to make it medium level project:

  1. User authentication feature using Firebase Authentication API.
     - Concepts to use: Firebase Authentication API, React Hooks.
     - Points: 10

  2. Dice roll history feature to display the results of the last 10 dice rolls.
     - Concepts to use: React Hooks, React Context API.
     - Points: 10

  3. Feature to change the background color of the dice rolling page.
     - Concepts to use: React Hooks, CSS.
     - Points: 5

  4. Feature to add sound effects when the dice are rolled.
     - Concepts to use: React Hooks, Web Audio API.
     - Points: 5

  5. Feature to add a setting to change the auto-roll interval.
     - Concepts to use: React Hooks, Web Storage API.
     - Points: 5
**/ 