  const player = (name, symbolNum) => {
    const getName = () => name;
    const getSymbolNum = () => {
      return symbolNum;
    };
    return { getName, getSymbolNum };
  };

  const game = (player1, player2, size) => {
    var lastMove = 2; /*means that player 1 will start*/
    let grid = size;
    let gameBoard = new Array(grid * grid + 1);

    const result = () => {
      if (isDraw()) return 0;
      else if (isWinner(player1.getSymbolNum())) return 1;
      else if (isWinner(player2.getSymbolNum())) return 2;
      else return 3;
    };

    const makeAMove = (playerMove) => {
      if (playerMove <= grid * grid && !gameBoard[playerMove]) {
        /* check if clicked place is empty */
        if (lastMove === 1) {
          move(player2, playerMove);
        } else {
          move(player1, playerMove);
        }
        console.log(playerMove);
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
        console.log("diagonal");
        return true;
      } else return false;
    };
    const isColumnsWinning = (symbolNum) => {
      for (let i = 1; i <= grid; i++) {
        let count = 0;
        for (let j = i; j <= grid * grid; j += grid) {
          if (gameBoard[j] == symbolNum) {
            count++;
          }
        }
        if (count == grid) {
          console.log(`colunb ${count}`);
          return true;
        }
      }
      return false;
    };

    const isRowsWinning = (symbolNum) => {
      for (let i = 1; i < grid * grid; i += grid) {
        let count = 0;
        for (let j = 0; j < grid; j++) {
          console.log(`///board[${i + j}] ${gameBoard[i + j]}`);
          if (gameBoard[i + j] == symbolNum) {
            count++;
          }
        }
        if (count == grid) {
          console.log("orw");
          return true;
        }
      }
      return false;
    };
    const clearGrid = () => {
      gameBoard = new Array(grid * grid + 1);
    };
    return { makeAMove, clearGrid, result };
  };

  const displayController = (() => {
    const player1x = document.querySelector(".player1 #player1-x.player1-x");
    const player1y = document.querySelector(".player1 #player1-y.player1-y");
    const player2x = document.querySelector(".player2 #player2-x.player1-y");
    const player2y = document.querySelector(".player2 #player2-y.player1-x");
    const userInputInterface = document.querySelector(".user-input-container");
    const error = document.querySelectorAll(
      "div.user-input-container div.symbol-error-message"
    );
    const gameInterface = document.querySelector(".game-interface");
    const boardContainer = document.querySelector(".board-container");
    const background = document.getElementById("overlay");

    let gameSize;
    let newGame;

    const startGameButton = document.querySelector(
      ".user-input-container>.start-game-button"
    );

    startGameButton.addEventListener("click", () => {
      getPlayersInput();
    });

    player1x.addEventListener("click", () => {
      player2y.checked = true;
      error.forEach((errorMessage) => hide(errorMessage));
    });
    player1y.addEventListener("click", () => {
      player2x.checked = true;
      error.forEach((errorMessage) => hide(errorMessage));
    });
    player2x.addEventListener("click", () => {
      player1y.checked = true;
      error.forEach((errorMessage) => hide(errorMessage));
    });
    player2y.addEventListener("click", () => {
      player1x.checked = true;
      error.forEach((errorMessage) => hide(errorMessage));
    });

    const startNewGame = (player1, player2, size) => {
      newGame = game(player1, player2, size);
      createBoard();

      const boardItems = document.querySelectorAll(".board-part");
      boardItems.forEach((item) => {
        item.addEventListener("click", () => {
          newGame.makeAMove(item.getAttribute("data-index"));
          console.log(newGame.result());
        });
      });
    };

    const getGameSize = () => {
      const sizeChoosingButtons = document.querySelectorAll(
        "button.size-choosing"
      );

      sizeChoosingButtons.forEach((button) => {
        const sizeWindow = document.querySelector(".size-option-container");
        button.addEventListener("click", () => {
          gameSize = Number(button.getAttribute("data-size"));
          hide(sizeWindow);
          show(userInputInterface);
          /*         console.log(gameSize); */
        });
      });
    };

    const getPlayersInput = () => {
      const player1 = document.querySelector(".user-input1>input");
      const player2 = document.querySelector(".user-input2>input");
      const player1SymbolOptions = document.querySelectorAll(
        ".user-input1>.player1>input"
      );
      const player1Name = player1.value || "player1";
      const player2Name = player2.value || "player2";
      /*     console.log(`PLAYER1Name : ${player1Name}`);
      console.log(`PLAYER2Name : ${player2Name}`); */
      let player1Symbol;
      let player2Symbol;
      player1SymbolOptions.forEach((option) => {
        if (option.checked) {
          player1Symbol = Number(option.value);
          /*         console.log(`PLAYER1sym : ${player1Symbol}`); */
          player2Symbol = (Number(option.value) + 1) % 3 || 1;
          /*         console.log(`player2sym : ${player2Symbol}`); */
          hide(userInputInterface);
          hide(background);
          show(gameInterface);
          startNewGame(
            player(player1Name, player1Symbol),
            player(player2Name, player2Symbol),
            gameSize
          );
          /*         console.log("end of getPlayerinput"); */
        } else {
          error.forEach((errorMessage) => show(errorMessage));
        }
      });
    };

    const createBoard = () => {
      /*     console.log("entered createBoard"); */
      setBoardSize();
      for (let i = 1; i <= gameSize * gameSize; i++) {
        const boardPart = createBoardPart("board-part", i);
        boardContainer.appendChild(boardPart);
      }
    };

    const createBoardPart = (className, dataIndex) => {
      const boardPart = document.createElement("div");
      boardPart.classList.add(className);
      boardPart.setAttribute("data-index", dataIndex);
      return boardPart;
    };

    const setBoardSize = () => {
      console.log("entered ended");
      const board = document.querySelector(".board-container");
      board.style = `grid-template: repeat(${gameSize} ,1fr)  / repeat(${gameSize} ,1fr);`;
    };
    const clearGrid = () => {
      boardContainer.innerHTML = "";
    };

    const hide = (node) => {
      node.classList.add("hide");
    };
    const show = (node) => {
      node.classList.remove("hide");
    };
    const change = (node) => {
      node.classList.add("change");
    };
    return { createBoard, startNewGame, getGameSize };
  })();

  displayController.getGameSize();
