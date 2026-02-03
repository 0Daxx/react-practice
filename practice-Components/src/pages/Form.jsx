import { useState } from "react";

export function Form() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

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
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div>
      <input
        type="text"
        onChange={saveName}
        value={name}
        placeholder="First Name"
      />
      {/* <p>{}</p> */}
      <input
        type="text"
        onChange={saveLastName}
        placeholder="Last Name"
        value={lastname}
      />

      <input
        type="email"
        value={email}
        onChange={saveEmail}
        placeholder="Email"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={savePassword}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={saveConfirmPassword}
      />

      <p>
        {/* {" "} */}
        {Object.entries(error).map(([key, value], i) => (
          <p key={i}>
            {key}: {value}
          </p>
        ))}{" "}
      </p>
      <button onClick={submit}>Submit</button>
    </div>
  );
}