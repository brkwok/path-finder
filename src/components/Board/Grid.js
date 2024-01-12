import Cell from "./Cell";

const Grid = ({ board }) => {
	return (
		<div className="grid-container">
			{board.map((rows, i) => {
				return (
					<div className="grid-row" key={`row ${i}`}>
						{rows.map((cell, j) => {
							return <Cell cell={cell} key={`cell ${i},${j}`} />;
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Grid;
