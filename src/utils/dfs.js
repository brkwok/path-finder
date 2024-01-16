import { ROWS, COLS } from "./constants";

export class DFS {
	dirs = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];
	constructor(start, end, board) {
		// DFS는 스택을 사용함, first-in-last-out
		this.stack = [];
		// Cell Object
		this.start = start;
		// Cell Object
		this.end = end;
		this.board = board;
	}

	findPath() {
		if (!this.start || !this.end) {
			console.log("Start or End Missing");
			return;
		}
		const seen = new Set();
		const path = [];
		this.stack.push(this.start);

		while (this.stack.length > 0) {
			const currCell = this.stack.pop();
      if (!seen.has(currCell)) {
        path.push(currCell);
      }
			seen.add(currCell);

			if (currCell === this.end) {
				return [path, currCell];
			}

			const row = currCell.row;
			const col = currCell.col;

			for (let [r, c] of this.dirs) {
				const nextCellRow = row + r;
				const nextCellCol = col + c;

				if (
					Math.min(nextCellRow, nextCellCol) < 0 ||
					nextCellRow >= ROWS ||
					nextCellCol >= COLS ||
					this.board[nextCellRow][nextCellCol].type === "cell-wall" ||
					seen.has(this.board[nextCellRow][nextCellCol])
				) {
					continue;
				}
        
        const nextCell = this.board[nextCellRow][nextCellCol];
        nextCell.parent = currCell;
				this.stack.push(nextCell);
			}

		}

    return [path, null];
	}
}
