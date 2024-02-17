import { ROWS, COLS } from "../constants";

const getRandomEvenInt = (mn, mx) => {
	const minCeil = Math.ceil(mn / 2);
	const maxFloor = Math.floor(mx / 2);

	return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil) * 2;
};

const getRandomInt = (mx) => {
	return Math.floor(Math.random() * mx);
};

export class RandomizedPrim {
	dirs = [
		[0, -2],
		[2, 0],
		[0, 2],
		[-2, 0],
	];
	dirs2 = [
		[0, -1],
		[1, 0],
		[0, 1],
		[-1, 0],
	];

	constructor(board) {
		this.board = board;
	}

	buildMaze() {
		const startRow = getRandomEvenInt(0, ROWS);
		const startCol = getRandomEvenInt(0, COLS);
		const initCell = this.board[startRow][startCol];
		initCell.visited = true;

		const pathSequence = [];
		pathSequence.push(initCell);

		const walls = [];

		walls.push(initCell);

		while (walls.length > 0) {
			const randomIdx = getRandomInt(walls.length);
			const randomCell = walls[randomIdx];

			const cellRow = randomCell.row,
				cellCol = randomCell.col;

			const randCellNeighbors = this._getNeighbors(cellRow, cellCol);
			const emptyNeiCells = [];

			randCellNeighbors.forEach((c) => {
				const neiCells = this._getNeighbors2(c.row, c.col);
				let hasVisitedNeighbor = false
				for (let i = 0; i < neiCells.length; i++) {
					if (neiCells[i].visited) {
						hasVisitedNeighbor = true
						break
					}
				}

				if (!hasVisitedNeighbor) {
					emptyNeiCells.push(c)
				}
			});

			
			if (emptyNeiCells.length > 0) {
				const randIdx = getRandomInt(emptyNeiCells.length);

				const chosenCell = emptyNeiCells[randIdx];
				emptyNeiCells.splice(randIdx);
				const midX = parseInt((chosenCell.row + randomCell.row) / 2);
				const midY = parseInt((chosenCell.col + randomCell.col) / 2);

				const midCell = this.board[midX][midY];

				pathSequence.push(randomCell, midCell, chosenCell);
				randomCell.visited = true;
				midCell.visited = true;
				chosenCell.visited = true;
				walls.push(chosenCell, randomCell);
			} else {
				walls.splice(randomIdx, 1)
			}
		}

		return pathSequence;
	}

	_getNeighbors(row, col) {
		const neighbors = [];

		for (let [x, y] of this.dirs) {
			const neiX = row + x,
				neiY = col + y;

			if (Math.min(neiX, neiY) < 0 || neiX >= ROWS || neiY >= COLS) {
				continue;
			}

			neighbors.push(this.board[neiX][neiY]);
		}

		return neighbors;
	}

	_getNeighbors2(row, col) {
		const neighbors = [];

		for (let [x, y] of this.dirs2) {
			const neiX = row + x,
				neiY = col + y;

			if (Math.min(neiX, neiY) < 0 || neiX >= ROWS || neiY >= COLS) {
				continue;
			}

			neighbors.push(this.board[neiX][neiY]);
		}

		return neighbors;
	}
}
