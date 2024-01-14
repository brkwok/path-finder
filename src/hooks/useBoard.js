import { useCallback, useState } from "react";
import { createBoard } from "../utils/boardUtil";

export const useBoard = (rows, cos) => {
	const [board, setBoard] = useState(createBoard());

	const resetBoard = useCallback(() => {
		const newBoard = createBoard();
		setBoard(newBoard);
	}, [])

	return [board, setBoard, resetBoard];
};
