const MazeGen = ({ handleRandomizedPrim, handleRecursiveDivision, algoRunning }) => {
	return (
		<div className="maze-gen-container">
			<button onClick={handleRandomizedPrim} disabled={algoRunning}>Randomized Prim</button>
			<button onClick={handleRecursiveDivision} disabled={algoRunning}>Recursive Division</button>
		</div>
	);
};

export default MazeGen;
