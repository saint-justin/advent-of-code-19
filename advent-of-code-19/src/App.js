import React from 'react';
import './App.css';

// Import the neccesary input files
import input from './inputs/day1.js'

// Import the neccesary scripts

function App() {
  const day1 = (input) => {
    let total = 0;
    let inputArr = input.split(/\r?\n/);
    inputArr.map((input) => {
      let num = Math.floor((parseInt(input) / 3) - 2);

      while(num >= 0)
      {
        total += num;
        num = Math.floor((num / 3) - 2);
      }
    })

  return <h2>{total.toString()}</h2>
  }

  return (
    <div className="App">
      <h2>Hello World!</h2>
      {day1(input)}
    </div>
  );
}

export default App;
