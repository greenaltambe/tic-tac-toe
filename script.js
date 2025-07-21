const game = (function () {
	const gameBoard = createGameBoard();
	const player1 = createPlayer("player1", "X");
	const player2 = createPlayer("player2", "O");

	let turn = 0; // 0 = player1, 1 = player2
	// for (let i = 0; i < 9; i++) {
	// 	if (turn === 0) {
	// 		gameBoard.putMark(i, player1);
	// 		gameBoard.showBoard();
	// 		if (gameBoard.checkWin(player1)) {
	// 			break;
	// 		}
	// 		turn = 1;
	// 	} else {
	// 		gameBoard.putMark(i, player2);
	// 		gameBoard.showBoard();
	// 		if (gameBoard.checkWin(player2)) {
	// 			break;
	// 		}
	// 		turn = 0;
	// 	}
	// }

	gameBoard.putMark(0, player1);
	gameBoard.showBoard();

	gameBoard.putMark(2, player2);
	gameBoard.showBoard();

	gameBoard.putMark(8, player1);
	gameBoard.showBoard();

	gameBoard.putMark(4, player2);
	gameBoard.showBoard();

	gameBoard.putMark(6, player1);
	gameBoard.showBoard();

	gameBoard.putMark(3, player2);
	gameBoard.showBoard();

	gameBoard.putMark(7, player1);
	gameBoard.showBoard();

	gameBoard.clearBoard();
})();

function createGameBoard() {
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
	};

	const putMark = (index, player) => {
		gameBoard[index] = player.symbol;
		checkWin(player);
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
			return;
		}
	};

	return { gameBoard, showBoard, putMark, clearBoard };
}

function createPlayer(name, symbol) {
	return { name, symbol };
}
