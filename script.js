let calcButton = document.getElementById('calc-button');
let resetButton = document.getElementById('reset-button');
let perfectOutput = document.getElementById('perfect-output');
let almostOutput = document.getElementById('almost-output');
let closeOutput = document.getElementById('close-output');

//function for calculate combinations button
const calculateCombinations = () => {
  let bulkPickAmount = parseInt(document.getElementById('bulk-pick-amount').value);
  let hoseLengths = document.getElementById('hose-lengths').value;
  let hoseLengthArray = hoseLengths.split(' ');
  let finalHoseLengthArray = [];
  for (length of hoseLengthArray) {
    finalHoseLengthArray.push(parseInt(length));
  }
  finalHoseLengthArray = finalHoseLengthArray.sort();
  finalHoseLengthArray = finalHoseLengthArray.reverse();

  const combine = (a) => {
    var fn = function(n, src, got, all) {
      if (n == 0) {
        if (got.length > 0) {
          all[all.length] = got;
        }
        return;
      }
      for (var j = 0; j < src.length; j++) {
        fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
      }
      return;
    }
    var all = [];
    for (var i=0; i < a.length; i++) {
      fn(i, a, [], all);
    }
    all.push(a);
    return all;
  }

  let combinations = combine(finalHoseLengthArray);

  let perfectCombos = [];
  let almostCombos = [];
  let closeCombos = [];

  const calculateCombos = (array) => {
    for (combo of array) {
        let comboSum = combo.reduce(function(a,b){ return a + b }, 0);
        if (comboSum == bulkPickAmount) {
        perfectCombos.push(combo);
        } else if (comboSum == (bulkPickAmount + 1)) {
        almostCombos.push(combo);
        } else if (comboSum == (bulkPickAmount + 2)) {
        closeCombos.push(combo);
        };
    };
    return perfectCombos, almostCombos, closeCombos;
  }

  calculateCombos(combinations);

  if (perfectCombos[0]){
  perfectOutput.innerHTML = 'This combo is perfect: ' + perfectCombos[0] + ' = ' + bulkPickAmount;
  perfectOutput.style.display = 'block';
  }

  if (almostCombos[0]){
  almostOutput.innerHTML = 'This combo is 1 over: ' + almostCombos[0] + ' = ' + (bulkPickAmount+1);
  almostOutput.style.display = 'block';
  }

  if (closeCombos[0]){
  closeOutput.innerHTML = 'This combo is 2 over: ' + closeCombos[0] + ' = ' + (bulkPickAmount+2);
  closeOutput.style.display = 'block';
  }

  if (perfectCombos[0] === undefined && almostCombos[0] === undefined && closeCombos[0] === undefined) {
    perfectOutput.innerHTML = "Sorry. I couldn't find any working combinations for your " + bulkPickAmount 
    + "ft bulk pick."
    perfectOutput.style.display = 'block';
    perfectOutput.style.backgroundColor = 'red';
  }
}
//end of calculateCombinations function

//function for reset button
const reset = () => {
  perfectOutput.style.display = 'none';
  closeOutput.style.display = 'none';
  almostOutput.style.display = 'none';
}

calcButton.onclick = calculateCombinations;
resetButton.onclick = reset;













/*
//think everything is good except input needs to be converted to array

let button = document.getElementById('button');

//combine function takes an array as argument and returns all combinations
const combine = (a) => {
    var fn = function(n, src, got, all) {
      if (n == 0) {
        if (got.length > 0) {
          all[all.length] = got;
        }
        return;
      }
      for (var j = 0; j < src.length; j++) {
        fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
      }
      return;
    }
    var all = [];
    for (var i=0; i < a.length; i++) {
      fn(i, a, [], all);
    }
    all.push(a);
    return all;
  }
  
  let combinations = combine(userInput);

  const calculateCombos = (array) => {
    for (let combo of array) {
        let comboSum = combo.reduce(function(a,b){ return a + b }, 0);
        if (comboSum == totalNeeded) {
            return combo + ' = ' + totalNeeded;
        }
    }
  };

const test = ()=> {
  let output = document.getElementById('output-field');
  output.style.color = 'red'
}

//button.onclick = () => {
  /*let totalNeeded = document.getElementById('field1').value;
  let lengths = document.getElementById('field2').value;
  let userInput = lengths.split(' ');
  let output = document.getElementById('output-field');
  let results = calculateCombos(combinations);
  ouput.innerHTML = results;
}


button.onclick = test;
  
*/

