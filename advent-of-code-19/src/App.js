import React from 'react';
import './App.css';

// Import the neccesary input files - Uncomment whichever one is needed
// import input from `./inputs/day${dayNumber}.js`
import input from "./inputs/day6.js";


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

    // for(let x=0; x<100; x++){
    //   for(let y=0; y<100; y++){
    //     if (getOutput(x, y) == 19690720)
    //       console.log(`FOUND: ${(100 * x) + y}`)
    //     else
    //       attempt++;
    //   }
    // }
    
    console.log("FAILED")
  }

  // Fxn for day three
  const day3 = (_input) => {
    const gridSize = 5000;
    const startPos = [2500, 2500]
    const grid = [];

    // Make a gridSize x gridSize 2d arr
    for(let i=0; i<gridSize; i++){
      let newRow = [];
      for(let j=0; j<gridSize; j++){
        newRow.push(0);
      }
      grid.push(newRow);
    }

    grid[startPos[0], startPos[2]] = -1;

    // Split the commands into those for each individual wire
    let commands = _input.split(/\r?\n/);
    let wireOneCommands = commands[0].split(',');
    let wireTwoCommands = commands[1].split(',');

    let position = [0,0];

    // "Wires" are a set of 4 digits.
    // For vert wires: 1,2,3,4 --> bottomX, bottomY, topX, topY
    // For horz wires: 1,2,3,4 --> leftX, leftY, rightX, rightY

    let wireOneVert = [];
    let wireTwoVert = [];

    let wireOneHorz = [];
    let wireTwoHorz = [];

    // Internal helper function to parse through and resolve commands
    const interpretWireCommands = (_command, _wireOne) => {
      let amount = parseInt(_command.slice(1));
      switch(_command.charAt(0)){
        case "U":
          if(_wireOne){
            wireOneVert.push([position[0], position[1], position[0], position[1]+amount]);
          } else {
            wireTwoVert.push([position[0], position[1], position[0], position[1]+amount]);
          }
          position[1] += amount;
          break;

        case "D":
            if(_wireOne){
              wireOneVert.push([position[0], position[1]-amount, position[0], position[1]]);
            } else {
              wireTwoVert.push([position[0], position[1]-amount, position[0], position[1]]);
            }
            position[1] -= amount;
          break;
        
        case "R":
            if(_wireOne){
              wireOneHorz.push([position[0], position[1], position[0]+amount, position[1]]);
            } else {
              wireTwoHorz.push([position[0], position[1], position[0]+amount, position[1]]);
            }
            position[0] += amount;
          break;
        
        case "L":
            if(_wireOne){
              wireOneHorz.push([position[0]-amount, position[1], position[0], position[1]]);
            } else {
              wireTwoHorz.push([position[0]-amount, position[1], position[0], position[1]]);
            }
            position[0] -= amount;
          break;
        default:
          console.log("INVALID COMMAND")
      }
    }

    // Interpret all the commands as needed
    for(let command of wireOneCommands){
      interpretWireCommands(command, true);
    }
    for(let command of wireTwoCommands){
      interpretWireCommands(command, false);
    }


    // console.log(wireOneVert)
    // Compare all vert wires to all horz wires looking for connections who's |xPos| + |yPos| is closest to zero
    // 0, 1, 2, 3 --> xMin, yMin, xMax, yMax
    const checkCollision = (_vertWire, _horzWire) => {
      if (_vertWire[0] > _horzWire[0] && _vertWire[0] < _horzWire[2])
        if (_horzWire[1] > _vertWire[1] && _horzWire[1] < _vertWire[3])
          return Math.abs(_vertWire[0]) + Math.abs(_horzWire[1]);
      return 9999999;
    }
    
    let bestDistance = 9999999;

    // Check all the verts of wire one vs the horz of wire 2
    for(let i=0; i<wireOneVert.length; i++){
      for(let j=0; j<wireTwoHorz.length; j++){
        let temp = checkCollision(wireOneVert[i], wireTwoHorz[j])
        if(temp < bestDistance){
          bestDistance = temp;
        }
      }
    }

    // Check all the horz of wire one vs the verts of wire 2
    for(let i=0; i<wireOneHorz.length; i++){
      for(let j=0; j<wireTwoVert.length; j++){
        let temp = checkCollision(wireOneHorz[i], wireTwoVert[j]);
        console.log(temp);
        if(temp < bestDistance){
          bestDistance = temp;
        }
      }
    }

    console.log("BEST: " + bestDistance)

    return <>{bestDistance}</>
  }

  // Fxn for day four
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
            // console.log(`Old String: ${strng.join("")} New String: ${newString}`)
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

  // Fxn for day six
  const day6 = (_input) => {
    // Make an array of all commands from the input
    let hash = new Object();
    let inputArr = input.split(/\r?\n/);
    hash["COM"] = 0;
    // hash["LX1"] = 0;
    console.log(`HASH: ${JSON.stringify(hash)}`)

    // Cycle through all elements looking for new adjustments to make
    let total = 0;
    while(inputArr.length > 0){
      for(let i=0; i<inputArr.length; i++){
        if(hash[inputArr[i].substring(0,3)] !== NaN && hash[inputArr[i].substring(0,3)] !== undefined){
          hash[inputArr[i].substring(4,7)] = hash[inputArr[i].substring(0,3)] + 1;
          total += hash[inputArr[i].substring(4,7)];
          inputArr.splice(i, 1);
        }
      }
    }

    console.log(total);
  }


  return (
    <div className="App">
      <h2>Hello World!</h2>
      {day6(input)}
    </div>
  );
}

export default App;
