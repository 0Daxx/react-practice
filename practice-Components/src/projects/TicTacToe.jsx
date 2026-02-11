import { useEffect, useState } from "react";

import "./TicTacToe.css";

function Box({ value, onClickBox, rowNum, colNum , win  }) {
  return (
    <>
      <button  
        disabled={value !== null }
        className={ typeof(win) === 'object' && win.includes(`${rowNum}${colNum}`) ? 'win' : 'box' }
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
  
  const [win,setWin] = useState(false);
  // TASK : check if there is a winner
    useEffect(() => {
      function checkWinner() {
        // check rows
        for (let i = 0; i < squares.length; i++) {
          const [first, second, third] = squares[i];
          if (first === second && second === third && first !== null) {
            setWin(  [`${i}0` , `${i}1`, `${i}2`] );
            return [i, 0];
          }
        }
        // check cols
        for (let i = 0; i < squares[0].length; i++) {
          const first = squares[0][i];
          const second = squares[1][i];
          const third = squares[2][i];
          if (first === second && second === third && first !== null) {
            setWin( [`0${i}` , `1${i}`, `2${i}`] );
            return [[0, i], [1, i], [2, i]];
          }
        }
        // check diagonals
        const firstDiagonal =
        squares[0][0] === squares[1][1] &&
        squares[1][1] === squares[2][2] &&
        squares[0][0] !== null;
        const secondDiagonal =
        squares[0][2] === squares[1][1] &&
        squares[1][1] === squares[2][0] &&
        squares[0][2] !== null;
        if (firstDiagonal) {
          setWin( ["00", "11","22"] );
          return [[0, 0], [1, 1], [2, 2]];
        }
        if (secondDiagonal) {
          setWin( ["20" , "11", "02"] );
          return [[2, 0] , [1, 1], [0, 2]];
        }
        return null;
      }
      // check if there is a winner : NOW pass this array to Box to see if its key is in this array 
      let win = checkWinner();
      console.log(win);
      
      // if (win) {
      //   setWin(currentPlayer);
      // }
    }, [squares, currentPlayer])

  function onClickBox(row, col) {
    if (win) {
      return;
    }
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
            <Box
              key={String(rowNum) + String(colNum)}
              value={value}
              rowNum={rowNum}
              colNum={colNum}
              onClickBox={onClickBox}
              win={win}
            />
          ));
        })}
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
