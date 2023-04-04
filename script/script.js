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
  const result = () => {
  };
  const makeAMove = (playerMove) => {
  };
  const move = (player, move) => {
  };
  const isDraw = () => {};
  const isWinner = (symbolNum) => {

  };

  const clearGrid = () => {
    gameBoard = new Array(grid * grid + 1);
  };
  return { makeAMove, clearGrid, result };
};
