import { useState } from "react";
import { createBoard } from "../utils/boardUtil";

export const useBoard = (rows, cos) => {
	const [board, setBoard] = useState(createBoard());

	return [board, setBoard];
};
