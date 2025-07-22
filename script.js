const game = (function () {
	const player1 = createPlayer("player1", "X");
	const player2 = createPlayer("player2", "O");
	const states = {
		turn: player1,
		gameOver: false,
		player1: player1,
		player2: player2,
		winner: null,
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
				return;
			}
		}

		// check diagonals
		if (
			(gameBoard[0] === player.symbol &&
				gameBoard[4] === player.symbol &&
				gameBoard[8] === player.symbol) ||
			(gameBoard[2] === player.symbol &&
				gameBoard[4] === player.symbol &&
				gameBoard[6] === player.symbol)
		) {
			console.log(`${player.name} wins!`);
			states.gameOver = true;
			states.winner = player;
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
	const turnDiv = document.querySelector("#turn");

	cells.forEach((cell, index) => {
		cell.addEventListener("click", () => {
			if (!gameBoard.putMark(index, states.turn)) {
				return;
			}

			if (states.turn === states.player1) {
				states.turn = states.player2;
				turnDiv.textContent = `Turn: ${states.player2.name}`;
			} else {
				states.turn = states.player1;
				turnDiv.textContent = `Turn: ${states.player1.name}`;
			}
			gameBoard.showBoard();
			showBoardOnDOM();

			if (states.gameOver) {
				if (states.winner === states.player1) {
					alert(`${states.player1.name} wins!`);
				} else if (states.winner === states.player2) {
					alert(`${states.player2.name} wins!`);
				} else {
					alert("Draw!");
				}
				gameBoard.clearBoard();
				showBoardOnDOM();
			}
		});
	});

	const showBoardOnDOM = () => {
		cells.forEach((cell, index) => {
			cell.textContent = gameBoard.gameBoard[index];
		});
	};

	return { showBoardOnDOM };
}

function createPlayer(name, symbol) {
	return { name, symbol };
}
