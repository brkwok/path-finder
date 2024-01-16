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
	const [startCell, setStartCell] = useState(null);
	const [endCell, setEndCell] = useState(null);

	// 지금 이것도 복잡하게 되있는데 나중에 시간 리액트 어느정도 이해하면 커스텀 훅
	// 직접 만들어보면 좋을것같음
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
		const b = board.slice();
		const cell = b[row][col];
		if (isSettingWall) {
			if (cell.type === "cell-empty") {
				cell.type = "cell-wall";
			} else if (cell.type === "cell-wall") {
				cell.type = "cell-empty";
			}
		} else if (isSettingStart) {
			// 스타트 셀이 지정이 안되있을 경우 그냥 선택된 셀을 시작으로 설정함
			if (!startCell) {
				cell.type = "cell-start";
				// 그 외엔 기존 설정되있던걸 엠티셀로 변경 후 선택된 셀을 시작셀로 설정
			} else {
				startCell.type = "cell-empty";
				cell.type = "cell-start";
			}
			setStartCell(cell);

			// 위와 동일
		} else if (isSettingDest) {
			if (!endCell) {
				cell.type = "cell-end";
			} else {
				endCell.type = "cell-empty";
				cell.type = "cell-end";
			}
			setEndCell(cell);
		}
		setBoard(b);
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
