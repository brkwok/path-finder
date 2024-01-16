const Algo = ({ handleDFS }) => {
	return (
		<div className="algo-container">
			<button onClick={handleDFS}>DFS</button>
			<button>BFS</button>
			<button>Djikstra</button>
		</div>
	);
};

export default Algo;
