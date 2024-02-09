const MazeGen = ({ handleRandomizedPrim, algoRunning }) => {
	return (
		<div className="maze-gen-container">
			<button onClick={handleRandomizedPrim} disabled={algoRunning}>Randomized Prim</button>
		</div>
	);
};

export default MazeGen;
