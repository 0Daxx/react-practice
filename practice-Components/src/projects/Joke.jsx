import axios from "axios";
import { useState } from "react";

export function Joke() {
  const [joke, setJoke] = useState("");
  const [jokeLoading, setJokeLoading] = useState(false);

  async function generateJoke() {
    if(joke !== '') {
      // setOldjoke(joke);
      localStorage.setItem("joke", joke);
    } 
    setJokeLoading(true);
    setJoke('Loading...');
    try {
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random",
      );
      const jokeText = response.data.value ;
      setTimeout(() => {
        setJoke(jokeText);
      }, 2000);
      // console.log(response.data.value);
    } catch (error) {
      console.log(error);
    }
    setJokeLoading(false);
  }

  return (
    <>
      <button onClick={ generateJoke }  disabled={jokeLoading}  >Generate Joke </button>
      <p>Joke : {joke} </p>
      <p>last joke : {  localStorage.getItem("joke")} </p> 
    </>
  );
}

/*
Upgrade the challenge:
1️⃣ Disable button while loading
2️⃣ Show loading text
3️⃣ Handle API error UI
4️⃣ Cache last joke in localStorage
Cancel button 

TO BE DONE : 
each joke as a chat message like in chatbot 
*/
