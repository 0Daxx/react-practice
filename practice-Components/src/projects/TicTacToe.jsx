import { useEffect, useState } from "react";

function Square({ player, setPlayer , setTurn }) {
  const [square, setSquare] = useState("");

  function play() {
    setSquare(player);
    setPlayer(player === "X" ? "O" : "X");
    setTurn( prev => !prev  );
  }
  // useEffect that runs whenever a play is done
  useEffect(() => {
    // check if there is a
  }, [player]);
  return (
    <>
      <button disabled={square !== ""} onClick={play}>
        {square || "_"}
      </button>
    </>
  );
}
export function TicTacToe() {
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState(true);
  const [squares, setSquares] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  return (
    // CSS used by AI
    <>
      <p> Turn : { turn === true ? "Player 1 : X " : "Player 2 : O "} </p>

      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3, 100px)",
          gap: "10px",
          fontSize: "35px",
        }}>
        {squares.map((square) => {
          // <Square  />

          // console.log(square);
          return square.map((square) => (
            <Square key={square} player={player} setPlayer={setPlayer} setTurn={setTurn}  />
          ));
        })}
        {/* <Square /> */}
      </div>
    </>
  );
}
