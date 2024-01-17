import { useCallback, useState } from "react";
import { createBoard } from "../utils/boardUtil";

export const useBoard = (rows, cos) => {
	const [board, setBoard] = useState(createBoard());
	const [startCell, setStartCell] = useState(null);
	const [endCell, setEndCell] = useState(null);

	const resetBoard = useCallback(() => {
		const newBoard = createBoard();
		setBoard(newBoard);
		setStartCell(null);
		setEndCell(null);
	}, [])

	return [board, setBoard, resetBoard, startCell, setStartCell, endCell, setEndCell];
};
