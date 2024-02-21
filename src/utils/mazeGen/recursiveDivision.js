import { ROWS, COLS } from "../constants";
import {
	getRandomEvenInt,
	getRandomInt,
	getRandomOddInt,
} from "../helper/mazeBuilderHelper";

// doesn't use recursion, but helps visualize what the algorithm would do
export class RecursiveDivision {
	constructor(board) {
		this.board = board;
	}

	buildMaze() {
		const pathSeq = [];
		// stack for min max information and cell location
		// holds array for minRow, maxRow, minCol, maxCol
		const stack = [[0, ROWS, 0, COLS]];

		while (stack.length > 0) {
			const [minRow, maxRow, minCol, maxCol] = stack.pop();

			if (maxRow - minRow < 3 || maxCol - minCol < 3) {
				continue;
			}

			const randomRow = getRandomEvenInt(minRow, maxRow);
			const randomCol = getRandomEvenInt(minCol, maxCol);

			for (let i = minRow; i < maxRow; i++) {
				const cell = this.board[i][randomCol];
				pathSeq.push(cell);
			}

			for (let i = minCol; i < maxCol; i++) {
				const cell = this.board[randomRow][i];
				pathSeq.push(cell);
			}

			const openWall = [];

			// opening up 3 holes on the wall
			if (minRow < randomRow) {
				const row = getRandomOddInt(minRow, randomRow);
				const cell = this.board[row][randomCol];
				cell.openWall = true;
				openWall.push(cell);
			}

			if (randomRow < maxRow) {
				let row = getRandomOddInt(randomRow, maxRow);

				if (row === ROWS) row -= 2;
				const cell = this.board[row][randomCol];
				cell.openWall = true;
				openWall.push(cell);
			}

			if (minCol < randomCol) {
				const col = getRandomOddInt(minCol, randomCol);
				const cell = this.board[randomRow][col];
				cell.openWall = true;
				openWall.push(cell);
			}

			if (randomCol < maxCol) {
				let col = getRandomOddInt(randomCol, maxCol);

				if (col === COLS) col -= 2;
				const cell = this.board[randomRow][col];
				cell.openWall = true;
				openWall.push(cell);
			}

			if (openWall.length === 4) {
				const cell = openWall.splice(getRandomInt(0, 4), 1);
				cell[0].openWall = false;
			}

			pathSeq.push(...openWall);

			// quad 1
			stack.push([minRow, randomRow, randomCol + 1, maxCol]);
			// quad 2
			stack.push([minRow, randomRow, minCol, randomCol]);
			// quad 3
			stack.push([randomRow + 1, maxRow, minCol, randomCol]);
			// quad 4
			stack.push([randomRow + 1, maxRow, randomCol + 1, maxCol]);
		}

		return pathSeq;
	}
}
