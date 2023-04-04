const player = (name, symbolNum) => {
  const getName = () => name;
  const getSymbolNum = () => {
    return symbolNum;
  };
  return { getName, getSymbolNum };
};

const game = (player1, player2, level) => {
  var lastMove = 2; /*means that player 1 will start*/
  let grid = level + 2;
  let gameBoard = new Array(grid * grid + 1);
  const result = () => {};
  const makeAMove = (playerMove) => {
    if (playerMove <= grid * grid && !gameBoard[playerMove]) {
      /* check if clicked place is empty */
      if (lastMove === 1) {
        move(player2, playerMove);
      } else {
        move(player1, playerMove);
      }
      console.log(gameBoard);

      if (isWinner(player1.getSymbolNum())) {
        console.log("player1 wins");
      } else if (isWinner(player2.getSymbolNum())) {
        console.log("player2 wins");
      }
    }
  };
  const move = (player, move) => {
    gameBoard[move] = player.getSymbolNum();
    if (lastMove == 1) lastMove = 2;
    else lastMove = 1;
  };
  const isDraw = () => {};
  const isWinner = (symbolNum) => {

  };

  const clearGrid = () => {
    gameBoard = new Array(grid * grid + 1);
  };
  return { makeAMove, clearGrid, result };
};
