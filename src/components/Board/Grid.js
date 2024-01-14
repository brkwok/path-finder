import Cell from "./Cell";

const Grid = ({ board, setBoard, handleMouseEnter, isMouseDown }) => {
	return (
		<div className="grid-container">
			{board.map((rows, i) => {
				return (
					<div className="grid-row" key={`row-${i}`}>
						{rows.map((cell, j) => {
							return (
								<Cell
									isMouseDown={isMouseDown}
									handleMouseEnter={handleMouseEnter}
									cell={cell}
									setBoard={setBoard}
									row={i}
									col={j}
									uniqueKey={`cell-${i},${j}`}
									key={`cell-${i},${j}`}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Grid;
