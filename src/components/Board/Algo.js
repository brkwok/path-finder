const Algo = ({ handleDFS, handleAStar, algoRunning }) => {
	return (
		<div className="algo-container">
			<button disabled={algoRunning} onClick={handleDFS}>
				DFS
			</button>
			<button disabled={algoRunning}>BFS</button>
			<button disabled={algoRunning} onClick={handleAStar}>A*</button>
		</div>
	);
};

export default Algo;
