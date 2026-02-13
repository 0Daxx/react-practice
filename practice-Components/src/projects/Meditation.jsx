import { useEffect, useState } from "react";

import dayjs from "dayjs";
export function Meditation() {
  const [time , setTime ] = useState(0);
  const [duration,setDuration] = useState(0);
  const [timer , setTimer ] = useState(false);
  useEffect(()=>{
    let interval ; 
    interval = setInterval(() => {
      setTime(() =>  dayjs().format('HH:MM:ss')  )
    }, 1000);
    return ()=> clearInterval(interval)
  },[time])
  
  useEffect(()=>{
    if(timer === false || duration === 0) return ;
    let interval ; 
    interval =  setInterval(() => {
      setDuration((prev) => prev - 1)
    }, 1000);
    return ()=> clearInterval(interval)
  },[timer,duration])

  return (
    <div>
      <p>Time : {time}</p>

      <input type="number" placeholder="Enter in mins"  onChange={(event) => setDuration(event.target.value * 60)} onKeyPress={(event) => {
        if (event.key === 'Enter') {
          event.target.value = '';
        }
      }}
          />

      <button onClick={() => setDuration((prev) => prev + 5 * 60)}>
        Add 5 min{" "}
      </button>

      <button onClick={() => setDuration((prev) => prev - 5 * 60)}>
        Decrease 5 min{" "}
      </button>
      
      <p className=" text-2xl " >
        {
        (duration > 3600) 
        ? Math.floor(duration / 3600) +
            " hr " + 
            Math.floor((duration % 3600) / 60) +
            " min " + 
            ((duration % 3600) % 60 === 0 ? "" : " " + ((duration % 3600) % 60) + " sec")
        : Math.floor(duration / 60) + " min " + 
            ((duration % 60) === 0 ? "" : " " + (duration % 60) + " sec")
          }
      </p>

      <button onClick={() => setTimer(true)} disabled={timer}>
        Start{" "}
      </button>
      <button disabled={!timer}  onClick={() => setTimer(false)}>Stop </button>
    </div>
  );
}

/*
functionality : 
Current Time 

a button to start the timer
a button to stop the timer

*/