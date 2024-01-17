const Algo = ({ handleDFS, algoRunning }) => {
	return (
		<div className="algo-container">
			<button disabled={algoRunning} onClick={handleDFS}>
				DFS
			</button>
			<button disabled={algoRunning}>BFS</button>
			<button disabled={algoRunning}>Djikstra</button>
		</div>
	);
};

export default Algo;
