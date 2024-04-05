import GridActions from "./GridActions";
import Grid from "./Grid";
import MazeGen from "./MazeGen";

import "./Board.css";
import { useBoard } from "../../hooks/useBoard";
import { useState } from "react";
import Algo from "./Algo";

import { RandomizedPrim } from "../../utils/mazeGen/randomizedPrim";
import { RecursiveDivision } from "../../utils/mazeGen/recursiveDivision";

import { DFS } from "../../utils/dfs";
import { BFS } from "../../utils/bfs";
import { GreedyBestFirstSearch } from "../../utils/GreedyBestFirstSearch";

const Board = () => {
	// 보드 셋업 해주는 커스텀 훅 ../../hooks/useBoard 파일 보면
	// 커스텀 훅 확인 가능
	const [
		board,
		setBoard,
		resetBoard,
		startCell,
		setStartCell,
		endCell,
		setEndCell,
	] = useBoard();
	const [algoRunning, setAlgoRunning] = useState(false);

	// 지금 이것도 복잡하게 되있는데 나중에 시간 리액트 어느정도 이해하면 커스텀 훅
	// 직접 만들어보면 좋을것같음
	const [isSettingWall, setIsSettingWall] = useState(false);
	const [isSettingStart, setIsSettingStart] = useState(false);
	const [isSettingDest, setIsSettingDest] = useState(false);
	const [isMouseDown, setIsMouseDown] = useState(false);

	// 마우스 꾹 눌렀을떄 마우스 다운 스태터스를 true로 설정해줌
	const handleMouseDown = (e) => {
		e.preventDefault();

		if (!isMouseDown) {
			setIsMouseDown(true);
		}
	};

	// 마우스에서 손 떘을때 마우스 다운 스태터스를 false로 설정
	const handleMouseUp = (e) => {
		e.preventDefault();

		setIsMouseDown(false);
	};

	// Cell.js 콤포넌트에서 확인 가능
	// 마우스 다운 상태일때 셀에 마우스가 엔터하면 벽으로 바꾸고
	// 보드를 업데이트 다시 함
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

	// 마우스 다운과 별개로 개별 클릭도 핸들링 해야해서 추가
	// 로직 자체는 마우스 다운과 비슷함
	// 펑션 자체는 Cell.js 에서 사용
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

	const handleBFS = () => {
		setAlgoRunning(true);
		const bfs = new BFS(startCell, endCell, board);

		const [pathsTaken, destCell] = bfs.findPath();

		const timeToDestCell = 50 * pathsTaken.length;

		pathsTaken.forEach((cell, i) => {
			setTimeout(() => {
				const newBoard = board.slice();

				if (cell !== startCell && cell !== endCell) {
					cell.type = "cell-probe";
				}

				setBoard(newBoard);
			}, i * 50);
		});

		let currCell = destCell;
		const pathsFound = [];
		while (currCell) {
			pathsFound.push(currCell);
			currCell = currCell.parent;
		}

		pathsFound.forEach((cell, i) => {
			setTimeout(() => {
				const newBoard = board.slice();
				if (cell !== startCell && cell !== endCell) {
					cell.type = "cell-path-found";
				}

				setBoard(newBoard);
			}, i * 50 + timeToDestCell);
		});

		setTimeout(() => {
			setAlgoRunning(false);
		}, 50 * (pathsFound.length + pathsTaken.length));
	};

	const handleDFS = () => {
		setAlgoRunning(true);
		const dfs = new DFS(startCell, endCell, board);

		const [pathsTaken, destCell] = dfs.findPath();

		const timeToDestCell = 50 * pathsTaken.length;

		pathsTaken.forEach((cell, i) => {
			setTimeout(() => {
				const newBoard = board.slice();

				if (cell !== startCell && cell !== endCell) {
					cell.type = "cell-probe";
				}

				setBoard(newBoard);
			}, i * 50);
		});

		let currCell = destCell;
		const pathsFound = [];
		while (currCell) {
			pathsFound.push(currCell);
			currCell = currCell.parent;
		}

		pathsFound.forEach((cell, i) => {
			setTimeout(() => {
				const newBoard = board.slice();
				if (cell !== startCell && cell !== endCell) {
					cell.type = "cell-path-found";
				}

				setBoard(newBoard);
			}, i * 50 + timeToDestCell);
		});

		setTimeout(() => {
			setAlgoRunning(false);
		}, 50 * (pathsFound.length + pathsTaken.length));
	};

	const handleGBFS = () => {
		const gbfs = new GreedyBestFirstSearch(startCell, endCell, board);

		const [pathsTaken, destCell] = gbfs.findPath();

		const timeToDestCell = 50 * pathsTaken.length;

		pathsTaken.forEach((cell, i) => {
			setTimeout(() => {
				const newBoard = board.slice();

				if (cell !== startCell && cell !== endCell) {
					cell.type = "cell-probe";
				}

				setBoard(newBoard);
			}, i * 50);
		});

		let currCell = destCell;
		const pathsFound = [];
		while (currCell) {
			pathsFound.push(currCell);
			currCell = currCell.parent;
		}

		pathsFound.forEach((cell, i) => {
			setTimeout(() => {
				const newBoard = board.slice();
				if (cell !== startCell && cell !== endCell) {
					cell.type = "cell-path-found";
				}

				setBoard(newBoard);
			}, i * 50 + timeToDestCell);
		});

		setTimeout(() => {
			setAlgoRunning(false);
		}, 50 * (pathsFound.length + pathsTaken.length));
	};

	const handleRandomizedPrim = async () => {
		setAlgoRunning(true);
		let newBoard = board.slice();

		for (let row of newBoard) {
			for (let cell of row) {
				cell.type = "cell-wall";
				cell.visited = false;
			}
		}

		await setBoard(newBoard);

		const prims = new RandomizedPrim(newBoard);
		const seq = prims.buildMaze();

		seq.forEach((cell, i) => {
			setTimeout(() => {
				const boardFilled = board.slice();

				cell.type = "cell-empty";

				setBoard(boardFilled);
			}, 20 * i + 1500);
		});

		setTimeout(() => {
			setAlgoRunning(false);
		}, 20 * seq.length + 1500);
	};

	const handleRecursiveDivision = async () => {
		setAlgoRunning(true);
		let newBoard = board.slice();

		for (let row of newBoard) {
			for (let cell of row) {
				cell.type = "cell-empty";
				cell.visited = false;
				cell.openWall = false;
			}
		}

		await setBoard(newBoard);

		const recDiv = new RecursiveDivision(newBoard);
		const seq = recDiv.buildMaze();

		seq.forEach((cell, i) => {
			setTimeout(() => {
				const boardFilled = board.slice();

				if (cell.type === "cell-wall" && cell.openWall) {
					cell.type = "cell-empty";
				} else {
					cell.type = "cell-wall";
				}

				setBoard(boardFilled);
			}, 20 * i);
		});

		setTimeout(() => {
			setAlgoRunning(false);
		}, 20 * seq.length);
	};

	return (
		<div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
			<MazeGen
				handleRandomizedPrim={handleRandomizedPrim}
				handleRecursiveDivision={handleRecursiveDivision}
				algoRunning={algoRunning}
			/>
			<GridActions
				resetBoard={resetBoard}
				setIsSettingWall={setIsSettingWall}
				setIsSettingStart={setIsSettingStart}
				setIsSettingDest={setIsSettingDest}
				isSettingWall={isSettingWall}
				isSettingStart={isSettingStart}
				isSettingDest={isSettingDest}
				algoRunning={algoRunning}
			/>
			<Grid
				board={board}
				setBoard={setBoard}
				isMouseDown={isMouseDown}
				handleMouseEnter={handleMouseEnter}
				handleClick={handleClick}
				algoRunning={algoRunning}
			/>
			<Algo
				handleDFS={handleDFS}
				handleGBFS={handleGBFS}
				handleBFS={handleBFS}
				algoRunning={algoRunning}
			/>
		</div>
	);
};

export default Board;
