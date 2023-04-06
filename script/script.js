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
    if (isDraw) return 0;
    else if (isWinner(player1.symbolNum)) return 1;
    else if (isWinner(player2.symbolNum)) return 2;
    else return 2;
  };
  const makeAMove = (playerMove) => {
    if (playerMove <= grid * grid && !gameBoard[playerMove]) {
      /* check if clicked place is empty */
      if (lastMove === 1) {
        move(player2, playerMove);
      } else {
        move(player1, playerMove);
      }
    }
  };
  const move = (player, move) => {
    gameBoard[move] = player.getSymbolNum();
    if (lastMove == 1) lastMove = 2;
    else lastMove = 1;
  };
  const isDraw = () => {
    for (let i = 1; i < gameBoard.length; i++) {
      if (!gameBoard[i]) return false;
    }
    return true;
  };
  const isWinner = (symbolNum) => {
    return (
      isDiagonalWinning(symbolNum) ||
      isColumnsWinning(symbolNum) ||
      isRowsWinning(symbolNum)
    );
  };
  const isDiagonalWinning = (symbolNum) => {
    let count1 = 0;
    let count2 = 0;
    for (let i = 0; i < grid; i++) {
      if (gameBoard[1 + grid * i + i] == symbolNum) {
        count1++;
      }
      if (gameBoard[grid + grid * i - i] == symbolNum) {
        count2++;
      }
    }
    if (count1 == grid || count2 == grid) {
      return true;
    } else return false;
  };
  const isColumnsWinning = (symbolNum) => {
    for (let i = 1; i <= grid; i++) {
      let count = 0;
      for (let j = i; j < grid * grid; j += grid) {
        if (gameBoard[j] == symbolNum) {
          count++;
        }
      }
      if (count == grid) return true;
    }
    return false;
  };

  const isRowsWinning = (symbolNum) => {
    for (let i = 1; i < grid * grid; i += grid) {
      let count = 0;
      for (let j = 0; j < grid; j++) {
        if (gameBoard[i + j] == symbolNum) {
          count++;
        }
      }
      if (count == grid) return true;
    }
    return false;
  };
  const clearGrid = () => {
    gameBoard = new Array(grid * grid + 1);
  };
  return { makeAMove, clearGrid, result };
};

const displayController = (() => {
  const startNewGame = (
    player1Name,
    player1Symbol,
    player2Name,
    player2Symbol
  ) => {
    const player1x = document.querySelector(".player1 #player1-x.player1-x");
    const player1y = document.querySelector(".player1 #player1-y.player1-y");
    const player2x = document.querySelector(".player2 #player2-x.player1-y");
    const player2y = document.querySelector(".player2 #player2-y.player1-x");

    player1x.addEventListener("click", () => {
      player2y.checked = true;
    });
    player1y.addEventListener("click", () => {
      player2x.checked = true;
    });
    player2x.addEventListener("click", () => {
      player1y.checked = true;
    });
    player2y.addEventListener("click", () => {
      player1x.checked = true;
    });
    let player1 = player(player1Name, player1Symbol);
    let player2 = player(player2Name, player2Symbol);
    let newGame = game(player1, player2,1);
    return newGame;
  };
  return { startNewGame };
})();


displayController.startNewGame();
