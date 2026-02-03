import { useState } from "react";


export function Acronym() {
  const [input, setInput] = useState("");
  function saveInput(event) {
    setInput(event.target.value);
  }

  function convertAcronym() {
    let arr = input.split(" ");
    console.log(arr);

    let acronym = "";
    for (let i = 0; i < arr.length; i++) {
      const char = arr[i].charAt(0).toUpperCase();
      console.log(char);
      acronym += char;
    }
    return acronym;
  }
  return (
    <>
      <input type="text" onChange={saveInput} />
      <p> {` TLA : ${convertAcronym(input)} `} </p>
    </>
  );
}