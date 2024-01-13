import GridActions from "./GridActions";
import Grid from "./Grid";

import "./Board.css";
import { useBoard } from "../../hooks/useBoard";
import Algo from "./Algo";

const Board = () => {
  const [board, setBoard] = useBoard();

	return (
		<>
			<GridActions />
			<Grid board={board}/>
			<Algo />
		</>
	);
};

export default Board;
