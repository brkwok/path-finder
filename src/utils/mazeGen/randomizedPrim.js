import { ROWS, COLS } from "../constants";

const getRandomOddInt = (mn, mx) => {
	const minCeil = Math.ceil(mn / 2);
	const maxFloor = Math.floor(mx / 2);

	return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil) * 2 + 1;
};

const getRandomInt = (mx) => {
	return Math.floor(Math.random() * mx);
};

export class RandomizedPrim {
	dirs = [
		[0, -1],
		[1, 0],
		[0, 1],
		[-1, 0],
	];

	constructor(board) {
		this.board = board;
	}

	buildMaze() {
		const startRow = getRandomOddInt(0, ROWS);
		const startCol = getRandomOddInt(0, COLS);
		const initCell = this.board[startRow][startCol];
		initCell.visited = true;

		const pathSequence = [];
		pathSequence.push(initCell);

		const walls = [];

		const initNeighbors = this._getNeighbors(startRow, startCol);
		walls.push(...initNeighbors);

		while (walls.length > 0) {
			const randomIdx = getRandomInt(walls.length);
			const randomCell = walls[randomIdx];

			// remove the cell from the random idx
			walls.splice(randomIdx, 1);

			const cellRow = randomCell.row,
				cellCol = randomCell.col;

			const randCellNeighbors = this._getNeighbors(cellRow, cellCol);
			const emptyNeiCells = randCellNeighbors.filter(
				(c) => c.visited === true
			);
			const nonEmptyNeiCells = randCellNeighbors.filter(
				(c) => c.visited === false
			);
      
			if (emptyNeiCells.length === 1) {
				pathSequence.push(randomCell);
				randomCell.visited = true;
				walls.push(...nonEmptyNeiCells);
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
}
