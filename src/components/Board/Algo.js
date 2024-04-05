const Algo = ({ handleDFS, handleGBFS, handleBFS, algoRunning }) => {
	return (
		<div className="algo-container">
			<button disabled={algoRunning} onClick={handleDFS}>
				DFS
			</button>
			<button disabled={algoRunning} onClick={handleBFS}>BFS</button>
			<button disabled={algoRunning} onClick={handleGBFS}>GBFS</button>
		</div>
	);
};

export default Algo;
