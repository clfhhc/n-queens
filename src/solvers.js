/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



// window.findNRooksSolution = function(n ) {
//   var solution = findNRooksSolutionSet(n)[0];

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
// };

// // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var solutionCount = findNRooksSolutionSet(n).length;
  
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

// window.findNRooksSolutionSet = function(n) {
//   if (n === 0) {
//     return [];
//   }
//   var output = [];
//   if (n === 1) {
//     output.push([[1]]);
//   } else {
//     var subSolutionSet = findNRooksSolutionSet(n - 1);
//     for (var firstRowColIndex = 0; firstRowColIndex < n; firstRowColIndex++) {
//       for (var subSolutionIndex = 0; subSolutionIndex < subSolutionSet.length; subSolutionIndex++) {
//         var tempArr = [new Array(n).fill(0)];
//         tempArr[0][firstRowColIndex] = 1;
//         for (var row = 0; row < n - 1; row++) {
//           var copyArr = Array.from(subSolutionSet[subSolutionIndex][row]);
//           copyArr.splice(firstRowColIndex, 0, 0);
//           tempArr.push(copyArr);
//         }
//         output.push(tempArr);
//       }
//     }
//   }
//   return output;
// };

// window.findNQueensSolutionSet = function(n) {
//   if (n === 0 || n === 2 || n === 3) {
//     return [];
//   }
//   var potentialSolutions = findNRooksSolutionSet(n);
 
//   return potentialSolutions.filter(function(solution) {
//     solution = new Board(solution);
//     return !solution.hasAnyMajorDiagonalConflicts() && !solution.hasAnyMinorDiagonalConflicts();
//   });
// };

// window.findNQueensSolution = function(n) {
//   var solutionSet = findNQueensSolutionSet(n);
//   if (solutionSet.length === 0) {
//     return new Array(n).fill(Array(n).fill(0));
//   }
//   var solution = solutionSet[0];

//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };

// window.countNQueensSolutions = function(n) {
//   if (n === 0) {
//     return 1;
//   }
//   var solutionCount = findNQueensSolutionSet(n).length;

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };

window.findNPieceSolutionsSet = function(n, type = 'rook') {
  //input: n: integer, type: string for type of piece
  //output: array of arrays of solution boards
  
  //Define algorithm to find nRooks
  let findNRooksSolutionSet = function(n) {
    if (n === 0) {
      return [];
    }
    var output = [];
    if (n === 1) {
      output.push([0]);
    } else {
      var subSolutionSet = findNRooksSolutionSet(n - 1);
      for (var firstRowColIndex = 0; firstRowColIndex < n; firstRowColIndex++) {
        for (var subSolutionIndex = 0; subSolutionIndex < subSolutionSet.length; subSolutionIndex++) {
          var tempArr = [firstRowColIndex];
          for (var row = 0; row < n - 1; row++) {
            tempArr.push((subSolutionSet[subSolutionIndex][row] >= firstRowColIndex) ? subSolutionSet[subSolutionIndex][row] + 1 : subSolutionSet[subSolutionIndex][row]);
          }
          output.push(tempArr);
        }
      }
    }
    return output;
  };

  //Define algorithm to find nQueens based on nRooks solutions
  let findNQueensSolutionSet = function(n, nRookSolutionSet) {
    if (n === 0 || n === 2 || n === 3) {
      return [];
    }
   
    return nRookSolutionSet.filter(function(solution) {
      return !hasAnyDiagonalConflicts(solution);
    });
  };
  
  let hasAnyDiagonalConflicts = function(array) {
    let noConflict = true;
    let i = 0;
    while (i < array.length - 1 && noConflict) {
      let j = i + 1;
      while (j < array.length && noConflict) {
        noConflict = noConflict && (Math.abs(array[i] - array[j]) !== Math.abs(i - j));
        j++;
      }
      i++;
    }
    return !noConflict;
    
  };
  
  //Code Start:
  var solutionSetRooks = findNRooksSolutionSet(n);
  
  if (type === 'rook') {
    return solutionSetRooks;
  }
  if (type === 'queen') {
    return findNQueensSolutionSet(n, solutionSetRooks);
  }
};

window.findNQueensSolution = function(n) {
  var solutionSet = findNPieceSolutionsSet(n, 'queen');
  if (solutionSet.length === 0) {
    return new Array(n).fill(Array(n).fill(0));
  }
  var solution = new Array(n).fill().map(()=> Array(n).fill(0));
  solutionSet[0].forEach((item, index) => {
    solution[index][item] = 1;
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = findNPieceSolutionsSet(n, 'queen').length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
