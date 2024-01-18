import { ROWS, COLS } from "./constants";

import { Heap } from "./Heap";

const defaultComparator = (n1, n2) => {
	if (n1[0] < n2[0]) {
		return 1;
	} else if (n1[0] > n2[0]) {
		return -1;
	} else {
		return 0;
	}
};

export class GreedyBestFirstSearch {
	dirs = [
		[0, -1],
		[1, 0],
		[0, 1],
		[-1, 0],
	];

	constructor(start, end, board, heap = [], comparator = defaultComparator) {
		this.heap = new Heap(heap, comparator);
		this.start = start;
		this.end = end;
		this.board = board;
	}

	findPath() {
		const pathsTaken = [];
		const manhattanDist =
			Math.abs(this.end.row - this.start.row) +
			Math.abs(this.end.col - this.start.col);
		this.heap.heapPush([manhattanDist, this.start]);
		const seen = new Set();

		while (!this.heap.isEmpty()) {
			// eslint-disable-next-line no-unused-vars
			const [dist, currCell] = this.heap.heapPop();

			if (!seen.has(currCell)) {
				pathsTaken.push(currCell);
			}
      seen.add(currCell)

			if (currCell === this.end) {
				return [pathsTaken, currCell];
			}

			if (currCell !== this.end && currCell !== this.start) {
				currCell.opac = (((manhattanDist - dist) / manhattanDist) / 2) + 0.5;
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

				const distToDest =
					Math.abs(this.end.row - nextCellRow) +
					Math.abs(this.end.col - nextCellCol);
				const nextCell = this.board[nextCellRow][nextCellCol];
				nextCell.parent = currCell;
				this.heap.heapPush([distToDest, nextCell]);
			}
		}

    return [pathsTaken, null]
	}
}
