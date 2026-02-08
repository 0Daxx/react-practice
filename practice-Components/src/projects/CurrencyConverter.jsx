import { useEffect, useState } from "react";

function CurrencyInput({
  currency,setCurrency,number,setNumber,currencies,
}) {
  return (
    <>
      <div>
        <span>From</span>
        <input
          type="number"
          onChange={(event) => setNumber(event.target.value)}
          value={number}
          // uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info:
        />
      </div>
      <div>
        <span>Currency type </span>

        <select
          name="currency-type"
          id="currency-type"
          onChange={(event) => setCurrency(event.target.value)}
          // console.log(symbol , name);
          value={currency}>
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
          {/* // TIP : If you remove the curly braces {} after the arrow =>, JavaScript performs an implicit return, meaning it automatically returns whatever follows. */}
        </select>
        <p>Selected option : {currency !== "Select" && currency} </p>
      </div>
    </>
  );
}

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState({});

  const [currency, setCurrency] = useState("");
  const [number, setNumber] = useState(0);
  const [symbol, setSymbol] = useState("");

  const [currency2, setCurrency2] = useState("");
  const [number2, setNumber2] = useState(0);
  const [symbol2, setSymbol2] = useState("");

  // change as many times the number is changed so useEffect
  useEffect(() => {
    async function fetchSymbols() {
      const resp = await fetch(`https://api.frankfurter.dev/v1/currencies`);
      const data = await resp.json();
      setCurrencies(data);
      // console.log(data);
      // console.log(data["AUD"]);
    }
    fetchSymbols();
  }, [currency]);

  // once fetched the rate , no need to recall the api
  useEffect(() => {
    async function fetchRates(from, to, amount) {
      let data , convertedAmount;
      if (!currency || !currency2 || !number) return;
      // CHECK
      // if (from !== "Select" && to !== "Select" && amount !== 0 && !localStorage.getItem("rateData") ) {
      if (from !== "Select" && to !== "Select" && amount !== 0 ) {
        
        const resp = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`,
        );
        data = await resp.json();
        // data = await resp.json(data.rates[to]);
        
        // save the data in Object 
        // localStorage.setItem("rateData" , { "from" : from , "to" : to , "rate" : data.rates[to]} );

        convertedAmount = (amount * data.rates[to]).toFixed(2); 
        
      }else{
        
        // const rate =  localStorage.getItem("rateData");
        // if(from === rate["from"] && rate["to"] === to ){
        //   convertedAmount = (amount * Number(rate["rate"]) ).toFixed(2); 
        // }
      }
      console.log(` FROM  ${from} TO ${to} `);
      console.log(`convertedAmount : ${convertedAmount}`);
      console.log(data);
      
      setNumber2(convertedAmount);
    }
    fetchRates(currency, currency2, number);
    // setNumber2(convertedAmount);
  }, [number, currency, currency2]);


  function swapCurrency() {
    setCurrency(currency2);
    setCurrency2(currency);
  }

  return (
    <>
      <CurrencyInput
        currencies={currencies}
        currency={currency}
        setCurrency={setCurrency}
        number={number}
        setNumber={setNumber}
        sumbol={symbol}
        setSymbol={setSymbol}
      />
      <CurrencyInput
        currencies={currencies}
        currency={currency2}
        setCurrency={setCurrency2}
        number={number2}
        setNumber={setNumber2}
        sumbol={symbol2}
        setSymbol={setSymbol2}
      />
      <button onClick={swapCurrency}>SWAP</button>

      <button> Fetch </button>
      <p> {number} {currency} is {number2} {currency2} </p>
    </>
  );
}

/*
TASK 

-> LOCAL STORAGE of rate of the currency 
-> fetch the symbol of the currency from the api

CHART of symbol price , 1 day , week , year 



⚡ Medium Features (Building Muscle)

    Inverse Conversion Toggle

        Goal: A button that swaps the "From" and "To" currencies instantly.

        Concept: State Management. You’ll practice swapping two state values simultaneously without causing an infinite re-render loop.

    Debounced API Calls

        Goal: Instead of fetching a new rate on every single keystroke, wait 500ms after the user stops typing.

        Concept: Custom Hooks & useEffect. You'll learn how to use setTimeout and cleanup functions to save on API usage and improve performance.

    Dynamic Flags/Icons

        Goal: Display the country's flag next to the currency code in the dropdown.

        Concept: Conditional Rendering. You’ll manage external asset URLs dynamically based on the string value of your state (e.g., "USD" -> flagsapi.com/US/flat/64.png).

    Conversion History List

        Goal: A "Recent Conversions" section that saves the last 5 calculations.

        Concept: Array State Manipulation. You’ll practice using prevstate to prepend new items to an array and .slice() to keep the list from growing indefinitely.

    Offline Support (Persistence)

        Goal: If the user refreshes the page, the last currency currencies and amount should still be there.

        Concept: localStorage & useEffect. You’ll learn how to "hydrate" your initial state from the browser's storage on the first mount.

🔥 Hard Features (Architectural Thinking)

    Interactive Multi-Currency Dashboard

        Goal: Let users select one "Base" currency and see it converted against a list of 5-10 "Watchlist" currencies simultaneously.

        Concept: Complex Data Mapping. You will have to handle an object of rates (e.g., { EUR: 0.9, GBP: 0.8 }) and map through them to render multiple calculated components at once.

    Historical Rate Charting

        Goal: Show a simple line graph of the currency's performance over the last 7 days.

        Concept: Third-party Libraries & useRef. You’ll need to integrate a library like Chart.js or Recharts, forcing you to learn how React interacts with non-React DOM elements using the useRef hook.
*/
