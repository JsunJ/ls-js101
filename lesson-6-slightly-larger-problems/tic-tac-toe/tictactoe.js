function displayBoard(board) {
  console.log('');
  console.log(`     |     |`);
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log(`     |     |`);
  console.log(`-----+-----+-----`);
  console.log(`     |     |`);
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log(`     |     |`);
  console.log(`-----+-----+-----`);
  console.log(`     |     |`);
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log(`     |     |`);
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = ' ';
  }

  //{
  //  1: ' ', 
  //  2: ' ',
  //  3: ' ',
  //  4: ' ',
  //  5: ' ',
  //  6: ' ',
  //  7: ' ',
  //  8: ' ',
  //  9: ' '
  //}

  return board;
}

let board = initializeBoard();
displayBoard(board);