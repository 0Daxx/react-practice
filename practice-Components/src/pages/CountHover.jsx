import { useState , useEffect } from "react";

export function HoverCounter() {
  // next LEVEL : a hover fills the para with color and takes 5 second to fill the whole element , hover less than 5 sec the color wont be saved

  const [count, setCount] = useState(0);
  const [isHovering, setIshovering] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isHovering) {
      intervalId = setTimeout(() => {
        setCount((count) => count + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isHovering]);
  return (
    <>
      <button
        onMouseEnter={() => {
          setIshovering(true);
        }}
        onMouseLeave={() => {
          setIshovering(false);
        }}>
        Hover me
      </button>
      <p>{count}</p>
    </>
  );
}
