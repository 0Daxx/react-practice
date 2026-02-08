import { useState } from "react";

import { ColorBtn } from "./ColorBtn";
import "./BgChanger.css";
export function BgChanger() {
  const [color, setColor] = useState("black"); // useState("black");
  const [colors, setColors] = useState([
    {
      id: crypto.randomUUID(),
      name: "red",
    },
    {
      id: crypto.randomUUID(),
      name: "green",
    },
    {
      id: crypto.randomUUID(),
      name: "blue",
    },
  ]);

  function addColor(){
    
  }

  function handleColorChange (color) {
    setColor(color);
  };

  return (
    <div className="bgChanger" style={{ backgroundColor: color }}>
      {colors.map((color) => (
        // console.log(color);

        <ColorBtn className="btn" 
          key={color.id}
          color={color}
          handleColorChange={handleColorChange}
        />
      ))}
    </div>
  );
}

/**
 * 
<div className="bgChanger" style={{ backgroundColor: color.name }}> 
  { colors.map( (color) => 
  
  <button key={color.id} onClick={changeBg(color.id)} > { color.name }  </button>
  ) }
</div>
 
 return <div className="bgChanger" style={{ backgroundColor: {color} }} > 
 <h1>hello </h1>
 
 { colors.map( (index , color ) => {
   <button key={index} onClick={changeBg(index)} >  </button>
 } ) }
 
 </div>
 


 */

{
  /* { colors.map( (color, index) => <div key={index} style={{ backgroundColor: color }}></div> ) } */
}
/* 
TODO 
Add more colors ,
delete color , 
modify color 
-> Pick a color from color picker 

Consider adding an error boundary to your tree to customize error handling behavior.
 * 
 * 
 * 
 */
