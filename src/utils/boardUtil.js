import { DefaultCell } from "./Cell";
import { ROWS, COLS } from "./constants";

export const createBoard = () => {
	const board = Array.from({ length: ROWS }, (_, i) => {
		return Array.from({ length: COLS }, (_, j) => new DefaultCell(i, j));
	});

	return board;
};
