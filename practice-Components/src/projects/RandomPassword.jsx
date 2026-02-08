import { useState } from "react";

export function RandomPassword() {
  const [password, setPassword] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [length, setLength] = useState(8);
  const [isCharacter, setIsCharacter] = useState(false);

  function generatePassword() {
    // can REGEX be used here  ???
    let rg = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");

    if (isNumber) rg = rg.concat("0123456789".split(""));

    if (isCharacter) rg = rg.concat("!@#$%^&*".split(""));

    const res = new Array(length)
      .fill("")
      .map(() => rg[Math.floor(Math.random() * rg.length)])
      .join("");
    // console.log(` ${res} `);
    setPassword(res);
  }

  function saveLength(event) {
    setLength(Number(event.target.value));
    generatePassword();
  }
  async function copyPassword() {
    await navigator.clipboard.writeText(password);
  }

  // useEffect(() => {
  //   generatePassword();
  // }, []);
  return (
    <>
      <div>
        <p> Generated Password : {password} </p>
        <button onClick={copyPassword}> Copy </button>
      </div>
      <div>
        <div>
          <input
            type="range"
            min="8"
            max="32"
            onChange={saveLength}
            value={length}
          />
          <p> {length} </p>
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            checked={isNumber}
            onChange={() => setIsNumber(!isNumber)}
          />
          <label htmlFor="numbers"> Numbers </label>
        </div>

        <div>
          <input
            type="checkbox"
            name="Characters"
            id="characters"
            checked={isCharacter}
            // Error : You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
            // Q : Why
            onChange={() => setIsCharacter(!isCharacter)}
          />
          <label htmlFor="characters">Characters</label>
        </div>
      </div>

      <div onClick={generatePassword}>
        <button>Generate</button>
      </div>
    </>
  );
}

/*
// TODO : Use passphrase instead of random words 

use old concept : show old generated password 

Concepts to be use : 
useRef 
useCallback
useEffect 

*/
