import { useState } from "react";
import './DarkTheme.css';

export function DarkTheme() {
  const [isDark, setIsdark] = useState(false);

  return (
    <>
      <p className={isDark ? "para-dark" : "para-light "}> p </p>
      <button
        onClick={() => {
          setIsdark((isDark) => !isDark);
        }}>
        {isDark ? "Light" : "Dark"}
      </button>
    </>
  );
}
