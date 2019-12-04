import React from 'react';
import './App.css';

// Import the neccesary input files - Uncomment whichever one is needed
// import input from `./inputs/day${dayNumber}.js`
// import input from "./inputs/day2.js";


function App() {

  // Fxn for day one
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

  // Fxn for day two
  const day2 = (input) => {
    // Loop at position 0 and find the opcode which indicates what to do
    // 99 indicates the program is finished and should hault immediately.
    // 1 adds together numbers read from two positions and stores the result in a third position
    // ex. [1,10,20,30] --> 1 means add, so add together the integers at indexes 10 and 20 and store them in position 4, where 30 is at the start
    // 2 multiplies together the items in the 2nd and 3rd position then stores the result in the 4th
    // Then, move onto the next one by stepping forward 4 positions
    let arr = input.split(',')
    console.log(arr);
    let attempt = 0;

    const getOutput = (noun, verb) => {
      let i=0;

      // Make a temp copy of the original array               ##### MAKE SURE THIS IS A DEEP COPY
      let testArr = Array.from(arr);
      //arr.map((i) => testArr.push(parseInt(i)));

      testArr[0] = noun;
      testArr[1] = verb;

      while(i <= testArr.length){
        switch(parseInt(testArr[i])){
          case 1:
              testArr[testArr[i+3]] = parseInt(testArr[testArr[i+1]]) + parseInt(testArr[testArr[i+2]]);
            break;
          case 2:
            testArr[testArr[i+3]] = parseInt(testArr[testArr[i+1]]) * parseInt(testArr[testArr[i+2]]);
            break;
          case 99:
            console.log("Exit Code 99 - " + testArr[0])
            return testArr[0];
            break;
          default:
            console.log("ERROR ATTEMPT NO. " + attempt);
            console.log("Array: " + testArr)
            return NaN;
        }
  
        i+= 4;
      }

      // Return out the item at index 0
      return testArr[0];
    }

    for(let x=0; x<100; x++){
      for(let y=0; y<100; y++){
        if (getOutput(x, y) == 19690720)
          console.log(`FOUND: ${(100 * x) + y}`)
        else
          attempt++;
      }
    }
    
    console.log("FAILED")
  }

  const day4 = () => {
    const inputMin = 246540;
    const inputMax = 787419;


    const runChecks = (input) => {
      let strng = input.toString().split("");

      // Check for value errors
      for(let i=0; i<strng.length-1; i++){
        if(parseInt(strng[i]) > parseInt(strng[i+1]))
          return false;
      }

      // Check through all characters for two in a row
      let tempYes = false;
      for(let i=0; i<strng.length-1; i++){
        if (strng[i] === strng[i+1]){
          if (strng[i] === strng[i+2]){

            // If a triple is found, pull out all of that character and move on -- NOTE- Not a perfect method (111011 would not be recognized as real when it should be) but gets the job done for my set
            let illegalChar = strng[i];
            let newString = strng.join("");
            while(newString.includes(illegalChar)){
              newString = newString.replace(illegalChar, "");
            }
            console.log(`Old String: ${strng.join("")} New String: ${newString}`)
            if (runChecks(newString))
              return true;
            else 
              return false;
          }
          else
            return true;
        }
      }


      // Found no matches
      return false;
    }

    let counter = 0;
    for(let i=inputMin; i<inputMax; i++){
      if (runChecks(i))
        counter++;
    }

    console.log("Amount found: " + counter);
  return <>{counter}</>
  }


  return (
    <div className="App">
      <h2>Hello World!</h2>
      {day4()}
    </div>
  );
}

export default App;
