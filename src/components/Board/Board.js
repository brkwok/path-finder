import GridActions from "./GridActions";
import Grid from "./Grid";

import "./Board.css";
import { useBoard } from "../../hooks/useBoard";
import { useState } from "react";
import Algo from "./Algo";

const Board = () => {
	// 보드 셋업 해주는 커스텀 훅 ../../hooks/useBoard 파일 보면
	// 커스텀 훅 확인 가능
	const [board, setBoard, resetBoard] = useBoard();

	const [isSettingWall, setIsSettingWall] = useState(false);
	const [isSettingStart, setIsSettingStart] = useState(false);
	const [isSettingDest, setIsSettingDest] = useState(false);
	const [isMouseDown, setIsMouseDown] = useState(false);

	const handleMouseDown = (e) => {
		e.preventDefault();

		if (!isMouseDown) {
			setIsMouseDown(true);
		}
	};

	const handleMouseUp = (e) => {
		e.preventDefault();

		setIsMouseDown(false);
	};

	const handleMouseEnter = (row, col) => {
		if (isMouseDown && isSettingWall) {
			const b = board.slice();
			const cell = b[row][col];

			if (cell.type === "cell-empty") {
				cell.type = "cell-wall";
			}
			setBoard(b);
		}
	};

	const handleClick = (row, col) => {
		if (isSettingWall) {
			const b = board.slice();
			const cell = b[row][col];

			if (cell.type === "cell-empty") {
				cell.type = "cell-wall";
			}
			setBoard(b);
		}
	};
	return (
		<div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
			<GridActions
				resetBoard={resetBoard}
				setIsSettingWall={setIsSettingWall}
				setIsSettingStart={setIsSettingStart}
				setIsSettingDest={setIsSettingDest}
				isSettingWall={isSettingWall}
				isSettingStart={isSettingStart}
				isSettingDest={isSettingDest}
			/>
			<Grid
				board={board}
				setBoard={setBoard}
				isMouseDown={isMouseDown}
				handleMouseEnter={handleMouseEnter}
				handleClick={handleClick}
			/>
			<Algo />
		</div>
	);
};

export default Board;
