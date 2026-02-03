import { useState } from "react";
import "./SubmissionForm.css";

export function SubmissionForm() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false); 
  const [ gender , setGender ] = useState("");
  const [ number , setNumer ] = useState("");
  const [ subject , setSubject ] = useState("");
  const [error, setError] = useState({});


  function saveGender(event) {
    setGender(event.target.value);
  }

  function saveNumber(event) {
    setNumer(event.target.value);
  }
  
  function savePassword(event) {
    setPassword(event.target.value);
  }

  function saveEmail(event) {
    setEmail(event.target.value);
  }

  function saveLastName(event) {
    setLastname(event.target.value);
  }
  function saveName(event) {
    setName(event.target.value);
  }

  function saveConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  function submit() {
    if (lastname === "")
      setError({ ...error, lastname: "lastname is required" });
    if (!email.includes("@")) setError({ ...error, email: "invalid email" });
    if (password.length < 8)
      setError({
        ...error,
        password: "password must be at least 8 characters",
      });
    if (password !== confirmPassword)
      setError({ ...error, confirmPassword: "passwords do not match" });

    console.log(name, lastname, email, password, confirmPassword);

    // if alright send to server
    reset();
  }

  function reset() {
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div>
      <p>First Name :</p>
      <input
        type="text"
        onChange={saveName}
        value={name}
        placeholder="First Name"
      />
      <p>Last Name :</p>
      <input
        type="text"
        onChange={saveLastName}
        placeholder="Last Name"
        value={lastname}
      />

      <p>Email : </p>
      <input
        type="email"
        value={email}
        onChange={saveEmail}
        placeholder="Email"
      />
      <p>Password :</p>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={savePassword}
      />
      <p> Confirm Password :</p>
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={saveConfirmPassword}
      />
      <p>Contact </p>
      <input type="number" /> 

      <p> Gender  </p>
      <input type="radio" name="gender" value="male" /> Male
      <input type="radio" name="gender" value="female" /> Female

      <p>your fav subject </p>
      <label>
        <input type="checkbox" value="Maths" />
        Maths
      </label>
      <label>
        <input type="checkbox" value="Physics" />
        Physics
      </label>
      <label>
        <input type="checkbox" value="Chemistry" />
        Chemistry
      </label>

      <p>Upload resume </p>
      <input type="file" accept=".pdf" />
      <p>Enter Link </p>
      <input type="url" />

      <p>time started learning react</p>
      <input type="date" />
      <p>select your country</p>
      <select>
        <option>India</option>
        <option>USA</option>
        <option>UK</option>
      </select>

      <p>about </p>
      <textarea placeholder="About about yourself"></textarea>

      
      <p>
        {/* {" "} */}
        {Object.entries(error).map(([key, value], i) => (
          <p key={i}>
            {key}: {value}
          </p>
        ))}{" "}
      </p>
      <button onClick={submit}>Submit</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default SubmissionForm;

// 7 things to Add , 5 basic , 6 medium , 7 advanced 
