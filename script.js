const game = (function () {
	const player1 = createPlayer("player1", "X");
	const player2 = createPlayer("player2", "O");
	const states = {
		turn: player1,
		gameOver: false,
		player1: player1,
		player2: player2,
		winner: null,
		winningCombination: null,
	};
	const gameBoard = createGameBoard(states);

	const { showBoardOnDOM } = htmlDisplay(gameBoard, states);
	showBoardOnDOM();
})();

function createGameBoard(states) {
	const gameBoard = [];
	for (let i = 0; i < 9; i++) {
		gameBoard.push(".");
	}

	const showBoard = () => {
		let row = "";
		for (let i = 0; i < 9; i++) {
			row += " " + gameBoard[i];
			if (i % 3 === 2) {
				console.log(row);
				row = "";
			}
		}

		console.log("\n");
	};

	const clearBoard = () => {
		for (let i = 0; i < 9; i++) {
			gameBoard[i] = ".";
		}

		states.turn = states.player1;
		states.gameOver = false;
		states.winner = null;
	};

	const putMark = (index, player) => {
		if (states.gameOver) {
			console.log("Game is over");
			return false;
		}

		if (gameBoard[index] !== ".") {
			console.log("Cell is already taken");
			return false;
		}

		gameBoard[index] = player.symbol;
		checkWin(player);
		return true;
	};

	const boardFull = () => {
		for (let i = 0; i < 9; i++) {
			if (gameBoard[i] === ".") {
				return false;
			}
		}
		return true;
	};

	const checkWin = (player) => {
		// check rows
		for (let i = 0; i < 9; i += 3) {
			if (
				gameBoard[i] === player.symbol &&
				gameBoard[i + 1] === player.symbol &&
				gameBoard[i + 2] === player.symbol
			) {
				console.log(`${player.name} wins!`);
				states.gameOver = true;
				states.winner = player;
				states.winningCombination = [i, i + 1, i + 2];
				return;
			}
		}

		// check columns
		for (let i = 0; i < 3; i++) {
			if (
				gameBoard[i] === player.symbol &&
				gameBoard[i + 3] === player.symbol &&
				gameBoard[i + 6] === player.symbol
			) {
				console.log(`${player.name} wins!`);
				states.gameOver = true;
				states.winner = player;
				states.winningCombination = [i, i + 3, i + 6];
				return;
			}
		}

		// check one diagonal
		if (
			gameBoard[0] === player.symbol &&
			gameBoard[4] === player.symbol &&
			gameBoard[8] === player.symbol
		) {
			console.log(`${player.name} wins!`);
			states.gameOver = true;
			states.winner = player;
			states.winningCombination = [0, 4, 8];
			return;
		}

		// check other diagonal
		if (
			gameBoard[2] === player.symbol &&
			gameBoard[4] === player.symbol &&
			gameBoard[6] === player.symbol
		) {
			console.log(`${player.name} wins!`);
			states.gameOver = true;
			states.winner = player;
			states.winningCombination = [2, 4, 6];
			return;
		}

		if (boardFull()) {
			console.log("Draw!");
			states.gameOver = true;
		}
	};

	return { gameBoard, showBoard, putMark, clearBoard, checkWin };
}

function htmlDisplay(gameBoard, states) {
	const cells = document.querySelectorAll(".cell");
	const status = document.querySelector("#status");
	const resetButton = document.querySelector("#reset-button");

	resetButton.addEventListener("click", () => {
		if (states.winningCombination) {
			states.winningCombination.forEach((index) => {
				cells[index].classList.remove("winning-cell");
			});
		}
		states.winningCombination = null;
		gameBoard.clearBoard();
		showBoardOnDOM();
	});

	cells.forEach((cell, index) => {
		cell.addEventListener("click", () => {
			if (!gameBoard.putMark(index, states.turn)) {
				return;
			}

			if (states.turn === states.player1) {
				states.turn = states.player2;
			} else {
				states.turn = states.player1;
			}
			gameBoard.showBoard();
			showBoardOnDOM();
		});
	});

	const showBoardOnDOM = () => {
		cells.forEach((cell, index) => {
			if (gameBoard.gameBoard[index] === ".") {
				cell.textContent = "";
			} else {
				cell.textContent = gameBoard.gameBoard[index];
			}
		});

		if (states.gameOver) {
			if (states.winner) {
				status.textContent = `${states.winner.name} wins!`;
				states.winningCombination.forEach((index) => {
					cells[index].classList.add("winning-cell");
				});
			} else {
				status.textContent = "Draw!";
			}
		} else {
			status.textContent = `Turn: ${states.turn.name}`;
		}
	};

	return { showBoardOnDOM };
}

function createPlayer(name, symbol) {
	return { name, symbol };
}
