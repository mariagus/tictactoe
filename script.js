function gameInit() {
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let gameLive = true;

  displayPlayer(currentPlayer, gameLive);

  function displayPlayer() {
    let showPlayer = document.querySelector("#currentPlayer");

    if (currentPlayer === "X") {
      showPlayer.textContent = "PLAYER 1's TURN!";
    } else {
      showPlayer.textContent = "COMPUTER'S TURN!";
    }
  }

  function handleClickedCell(event) {
    if (currentPlayer === "X") {
      let cell = event.target;
      let index = cell.dataset.index;
      if (gameState[index] === "" && gameLive) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        calculateWinner();
        switchPlayer();
        displayPlayer();
      }
    }
    setTimeout(computersTurn, 500);
  }

  function switchPlayer() {
    currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  }

  function calculateWinner() {
    let winner;

    let winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winCombinations.forEach((subArr) => {
      let a = subArr[0];
      let b = subArr[1];
      let c = subArr[2];

      if (
        gameState[a] === currentPlayer &&
        gameState[b] === currentPlayer &&
        gameState[c] === currentPlayer
      ) {
        currentPlayer === "X" ? (winner = "PLAYER 1") : (winner = "PLAYER 2");
        let announceWinner = `${winner} WINS!`;
        showWinner(announceWinner);
        gameLive = false;
        newGameButton();
      } else if (!winner && !gameState.includes("")) {
        let draw = "It's a DRAW!";
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".winnerMessage").textContent = draw;
        gameLive = false;
        newGameButton();
      }
    });
  }

  function showWinner(winner) {
    let modal = document.querySelector(".modal");
    let winnerMessage = document.querySelector(".winnerMessage");
    let close = document.querySelector(".close");

    modal.style.display = "block";
    winnerMessage.textContent = winner;
    close.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  function newGameButton() {
    if (!gameLive) {
      const newGameButton = document.querySelector("#newGame");
      newGameButton.innerHTML = `<button id="btn">NEW GAME</button>`;
      newGameButton.addEventListener("click", () => {
        displayPlayer(currentPlayer);
        gameLive = true;
        resetGameState();
        let btn = document.querySelector("#btn");
        newGameButton.removeChild(btn);
      });
    }
  }
  function computersTurn() {
    if (currentPlayer === "O" && gameLive) {
      let index = decideComputerMove();

      document.querySelectorAll(".cell").forEach((cell) => {
        if (cell.dataset.index == index) {
          cell.textContent = currentPlayer;
          gameState[index] = currentPlayer;
        }
      });

      calculateWinner();
      switchPlayer();
      displayPlayer();
    }
  }

  function decideComputerMove() {
    // return the index of the game for computer to check
    let index = gameState.findIndex((val) => !val);
    let winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winCombinations.forEach((subArr) => {
      let a = subArr[0];
      let b = subArr[1];
      let c = subArr[2];

      if (gameState[a] === "X" && gameState[b] === "X" && gameState[c] === "") {
        index = c;
      }
      if (gameState[a] === "X" && gameState[b] === "" && gameState[c] === "X") {
        index = b;
      }
      if (gameState[a] === "" && gameState[b] === "X" && gameState[c] === "X") {
        index = a;
      }
    });
    return index;
  }

  function randomIndex(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function resetGameState() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    document
      .querySelectorAll(".cell")
      .forEach((cell) => (cell.textContent = ""));
  }

  document
    .querySelector(".container")
    .addEventListener("click", handleClickedCell);
}

let startGame = document.querySelector("#startGame");

startGame.addEventListener("click", () => {
  gameInit();
  startGame.style.display = "none";
});
