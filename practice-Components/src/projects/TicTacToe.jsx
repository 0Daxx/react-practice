import { useEffect, useState } from "react";

function Box({ value, onClickBox, rowNum, colNum }) {
  return (
    <>
      {/* box tells Parent which was clicked  */}
      <button
        disabled={value !== null}
        onClick={() => {
          onClickBox(rowNum, colNum);
        }}>
        {value === 1 ? "X" : value === 2 ? "O" : value || "_"}
      </button>
    </>
  );
}
export function TicTacToe() {
  const [squares, setSquares] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  // TASK : check if there is a winner
  useEffect(() => {
    function checkWinner() {
      // check if col0 === 1 
      // check row 
      for (let row = 0; row < squares.length; row++) {
        const element = squares[row][0];
        for (let col = 1; col < row.length; col++) {
          if (element === squares[row][col] ){
            return row , col 
          }
      }
      for (let i = 1; i < squares.length; i++) {
        // 
        const element = squares[0][i];
        for (let j = 1; j < i.length; j++) {
          if (element === squares[i][j] ){
            return i , j 
          }
      }
    }
        // console.log(element);
      // check for col 
      
    }
  }
    // check if there is a
  }, [squares]);

  function onClickBox(row, col) {
    // console.log(row, col);
    const newSquares = [...squares];
    newSquares[row][col] = currentPlayer;
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }
  return (
    <>
      <p> Turn : {currentPlayer === 1 ? "Player 1 : X " : "Player 2 : O "} </p>

      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3, 100px)",
          gap: "10px",
          fontSize: "35px",
        }}>
        {squares.map((row, rowNum) => {
          return row.map((value, colNum) => (
            // return row.map((col ) => (
            // row , col
            <Box
              key={String(rowNum) + String(colNum)}
              value={value}
              rowNum={rowNum}
              colNum={colNum}
              onClickBox={onClickBox}
            />
          ));
        })}
        {/* <Box /> */}
      </div>
    </>
  );
}
/*
RN : 
how to find out which element to change value of 


TODO : 

1. Add a reset button
2. Add a timer
3. Add a score board
4. Add a sound effect
5. Add a leaderboard


mine : 
-> NxN grid  
-> Suggest CHEAT moves for me to win or draw
-> Multi player mode 
-> Show likeliness of winning or draw , after every move 



// why BROKE : If state is nested → never use .fill() with objects/arrays.
  /* Why (conceptually):

Array(3).fill(x) copies the same reference

All rows point to the same inner array

Updating one cell updates every row


// const [squares, setSquares] = useState(
  // Array(3).fill(Array(3).fill([0, crypto.randomUUID()])),);
  */
