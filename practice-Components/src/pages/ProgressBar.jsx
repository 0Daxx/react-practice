import { useState, useEffect } from "react";
import "./ProgressBar.css";

export function ProgressBar() {
  const [percentage, setPercentage] = useState(0);
  const [isloading, setIsloading] = useState(false);


  function startLoading(){
    setIsloading(true);
  }

  useEffect(() => { 
    if( !isloading ) return;
      const intervalId = setInterval(() => {
        setPercentage( (prev) => { 
          if(prev > 100){
            setIsloading(false) 
            // setPercentage(0);
            return 100
          } 
          return prev  + 1 } )
      },10 );
      return () => clearInterval(intervalId);
    },[isloading])

  return (
    <>
      <div className="progress-container">
        <p className="progress-bar" style={ {width : `${percentage}%` }}>Loading {percentage}</p>
      </div>

      <button onClick={startLoading} disabled={isloading || percentage === 100 }> { percentage === 100 ? 'Done' : 'Load' } </button>
    </>
  );
}
