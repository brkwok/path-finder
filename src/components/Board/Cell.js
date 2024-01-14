import "./Cell.css";

const Cell = ({ cell, uniqueKey, row, col, handleMouseEnter }) => {

	return <div onMouseEnter={() => handleMouseEnter(row, col)} className="cell" id={cell.type}></div>;
};

export default Cell;
