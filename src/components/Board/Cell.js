import "./Cell.css";

const Cell = ({ cell, uniqueKey, row, col, handleMouseEnter, handleClick }) => {
  const opac = (cell.type === "cell-path-found" || cell.type === "cell-probe") ? cell.opac : 1;

	return (
		<div
			onMouseEnter={() => handleMouseEnter(row, col)}
			onClick={() => handleClick(row, col)}
			className="cell"
			id={cell.type}
      style={{opacity: opac}}
      
		></div>
	);
};

export default Cell;
