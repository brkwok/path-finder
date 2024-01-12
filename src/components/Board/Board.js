import GridActions from "./GridActions";
import Grid from "./Grid";

import "./Board.css";
import { useBoard } from "../../hooks/useBoard";

const Board = () => {
  const [board, setBoard] = useBoard();

	return (
		<>
			<GridActions />
			<Grid board={board}/>
		</>
	);
};

export default Board;
