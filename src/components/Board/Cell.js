import "./Cell.css";

const Cell = ({ cell, uniqueKey, row, col, handleMouseEnter, handleClick }) => {
	return (
		<div
			onMouseEnter={() => handleMouseEnter(row, col)}
			onClick={() => handleClick(row, col)}
			className="cell"
			id={cell.type}
		></div>
	);
};

export default Cell;
