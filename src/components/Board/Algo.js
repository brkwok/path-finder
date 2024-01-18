const Algo = ({ handleDFS, handleGBFS, algoRunning }) => {
	return (
		<div className="algo-container">
			<button disabled={algoRunning} onClick={handleDFS}>
				DFS
			</button>
			<button disabled={algoRunning}>BFS</button>
			<button disabled={algoRunning} onClick={handleGBFS}>GBFS</button>
		</div>
	);
};

export default Algo;
