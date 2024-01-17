const GridActions = ({
	resetBoard,
	setIsSettingWall,
	setIsSettingStart,
	setIsSettingDest,
	isSettingWall,
	isSettingStart,
	isSettingDest,
	algoRunning,
}) => {
	const handleStartButton = (e) => {
		e.preventDefault();

		setIsSettingWall(false);
		setIsSettingDest(false);
		setIsSettingStart(!isSettingStart);
	};

	const handleWallButton = (e) => {
		e.preventDefault();

		setIsSettingWall(!isSettingWall);
		setIsSettingDest(false);
		setIsSettingStart(false);
	};

	const handleDestButton = (e) => {
		e.preventDefault();

		setIsSettingWall(false);
		setIsSettingDest(!isSettingDest);
		setIsSettingStart(false);
	};

	return (
		<div className="grid-actions-container">
			{/* 이거 나중에 아이콘같은걸로 바꾸면 좋을것같아ㅓ
				일단 임시로 버튼으로 만들어놓음
			*/}
			<button
				disabled={algoRunning}
				className={isSettingStart ? "button-active" : ""}
				onClick={handleStartButton}
			>
				Set Start
			</button>
			<button
				disabled={algoRunning}
				className={isSettingWall ? "button-active" : ""}
				onClick={handleWallButton}
			>
				Set Walls
			</button>
			<button
				disabled={algoRunning}
				className={isSettingDest ? "button-active" : ""}
				onClick={handleDestButton}
			>
				Set Destination
			</button>
			<button onClick={resetBoard}>Clear</button>
		</div>
	);
};

export default GridActions;
