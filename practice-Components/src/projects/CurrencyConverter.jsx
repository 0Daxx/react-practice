import { useEffect, useState } from "react";

function CurrencyInput({
  currency,
  setCurrency,
  number,
  setNumber,
  currencies,
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
    }
    fetchSymbols();
  }, [currency]);

  // once fetched the rate , no need to recall the api
  useEffect(() => {
    async function fetchRates(from, to, amount) {
      let data, convertedAmount = 0 ;

      data = JSON.parse(localStorage.getItem('data'));
      if (
        !currency || !currency2 || !number || from === "Select" || to === "Select" || amount === 0
      ) {
        return;
      }
      // IF exists
      else if ( 
        data !== null && 
        data.base === from && 
        data.rates[to]   
      ) {
        console.log(` \n\n FETCHED FROM LocalStorage\n\n `);
        console.log(data);
        
        convertedAmount = (amount * Number(data.rates[to])).toFixed(2);
      } 
      else {
        console.log(`API FETCHED \n\n `);
        const resp = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`,
        );
        data = await resp.json();
        // save the data in local storage
        localStorage.setItem("data", JSON.stringify(data));
        // CHECK
        // const localData = JSON.parse(localStorage.getItem("data")); 
        // console.log(` DATA SAVED IN localStorage : ${localData} `);

        convertedAmount = (amount * data.rates[to]).toFixed(2);
      } 
      setNumber2(convertedAmount);
      console.log(` FROM  ${from} TO ${to} `);
      console.log(`convertedAmount : ${convertedAmount}`);
      console.log(data);
    }
    fetchRates(currency, currency2, number);
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
      <p>
        {" "}
        {number} {currency} is {number2} {currency2}{" "}
      </p>
    </>
  );
}

/*
TASK 

-> LOCAL STORAGE of rate of the currency 
-> fetch the symbol of the currency from the api
-> Suggest : To currency based on user ip 
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

MORE FEATURES CAN BE ADDED : 
To make this reflect a professional, real-world application, we can focus on performance, reliability, and user experience. 🛠️

Here are 10 ways to optimize your currency converter:
1. The "Swap" Optimization 🔄

When you swap "From" and "To," the useEffect triggers because the dependencies changed. However, the rate is already in your state or storage! You can add a check to see if the required rate is already present in your data object before calling fetch.
2. Request Deduplication 🛑

If a user clicks the "Convert" button multiple times quickly, or if the state updates rapidly, you might send 5 identical API requests. You can use an AbortController to cancel the previous fetch if a new one starts.
3. State Normalization 📊

Instead of saving one single "rate" object, professional apps often store a "rates" dictionary in localStorage keyed by the base currency:
JSON

{
  "USD": { "INR": 83, "EUR": 0.92 },
  "EUR": { "USD": 1.08, "INR": 90 }
}

4. Handling API Expiration ⏰

Exchange rates change! Saving data forever in localStorage leads to stale prices.

    Concept: Timestamping. Save the time of the fetch and only use the cache if it's less than, say, 1 hour old.

5. Loading & Error States ⌛

Users hate staring at a frozen screen.

    Concept: UX Feedback. Add an isLoading and an error state to show a spinner or a "Check your internet" message.

6. Debouncing Input ⌨️

If the conversion happens "as you type," use a debounce function. This waits for the user to stop typing for 300-500ms before triggering the calculation or fetch.
7. Custom Hook for Logic 🪝

Move the fetchRates and localStorage logic out of the component and into a custom hook like useCurrency().

    Concept: Separation of Concerns. This keeps your UI component clean and focuses only on rendering.

8. Use constants for Config 📂

Avoid "magic strings" like "https://api.frankfurter.dev/v1/". Move URLs and default values into a separate constants.js file.
9. Input Validation & Formatting 🔢

Handle edge cases: What if the user pastes a negative number or a string? Use a regex or a library to ensure the input is always a valid currency format.
10. Memoization with useMemo 🧠

If you have a complex calculation based on the rates, wrap it in useMemo. This prevents the math from running on every single re-render of the component unless the numbers actually change.
Let's start with the "Swap" optimization (Point #1)

Imagine the user has "USD" to "INR" selected and your app has already fetched the rates. If the user clicks a "Swap" button, your from becomes "INR" and your to becomes "USD".

Currently, your useEffect sees the change and runs. If we want to avoid the API call during a swap, we need to know the inverse rate.

If the rate for 1 USD=80 INR, how would you mathematically calculate the rate for 1 INR in USD without asking the API?
*/
