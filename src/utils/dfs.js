import { ROWS, COLS } from "./constants";

export class DFS {
	dirs = [
		[0, -1],
		[1, 0],
		[0, 1],
		[-1, 0],
	];
	constructor(start, end, board) {
		// DFS는 스택을 사용함, last in first out(LIFO)
    // dfs는 특히 재귀함수를 많이 사용하는편인데 그건 나중에 직접 해보는것도 좋을듯
    // 재귀함수가 펑션을 간편하게 쓸수 있는 장점이 있음
    // 이번 경우에는 iterative 버전으로 적용함
		this.stack = [];
		// Cell Object
		this.start = start;
		// Cell Object
		this.end = end;
		this.board = board;
	}

  /**
   * 
   * @returns [Array, Cell] 여지껏 방문했던 셀들 순차적으로 정렬되있는 array와 ending-cell을 리턴함. 엔딩 셀이 없다면 null을 리턴
   */
	findPath() {
    // 시작이나 엔드 포인트가 없으면 길을 찾는 의미가 없음,
    // 나중에 리액트쪽에 메시지 디스플레이 해줘야할것같음
		if (!this.start || !this.end) {
			console.log("Start or End Missing");
			return [[], null];
		}
    
    // 이미 방문한 셀들 트랙하기위해 세트 오브젝트 사용
    // 세트는 중복으로 추가가 되지 않음
		const seen = new Set();

    // 애니메이션 위해 방문한 셀들을 순차적으로 집어넣기 위한 array
		const path = [];
    // 스택 initialization. 한개라도 있어야 아래 while루프를 돌릴수 있음
		this.stack.push(this.start);

    // dfs 알고리즘의 정수인 while loop
		while (this.stack.length > 0) {
      // 스택 제일 위에 있는 아이템을 팝 함
      // 대체적으로 스택은 array를 많이 사용함
      // 뒤에 아이템을 더하고 빼는게 time complexity가 O(1)임
      // 대충 제일 빠르다는뜻
      // [아이템1 ... 아이템10] 이 있음 제일 뒤에다가 그냥 애드랑 팝만 하는거
      // 그래서 last in first out
			const currCell = this.stack.pop();

      // 그리고 알고리즘에서 중요한건 이미 방문한 셀은 다시 보기 싫다는거
      // 그래서 seen이라는 해쉬세트 오브젝트에 셀을 방문했다고 체크
      if (!seen.has(currCell)) {
        path.push(currCell);
      }
			seen.add(currCell);

      // 그리고 지금 내가 방문한 셀이 끝이라면 그냥 더 와일룹 볼것도 없이
      // 원하는 데이터 리턴하면 됨
			if (currCell === this.end) {
				return [path, currCell];
			}

			const row = currCell.row;
			const col = currCell.col;

      // 위에 dirs 라는 함수에 지금 셀에서 움직일수 있는 방향들을 설정해놨음
      // dirs에 있는 방향대로 for loop을 돌림
			for (let [r, c] of this.dirs) {
        // 다음 좌표들을 구하는중
				const nextCellRow = row + r;
				const nextCellCol = col + c;
        
        // 다음 좌표가 이미 방문 됬거나, 그리드 밖이거나 벽이면 더 볼 필요도 없지
        // 패스 해버리면 됨
				if (
					Math.min(nextCellRow, nextCellCol) < 0 ||
					nextCellRow >= ROWS ||
					nextCellCol >= COLS ||
					this.board[nextCellRow][nextCellCol].type === "cell-wall" ||
					seen.has(this.board[nextCellRow][nextCellCol])
				) {
					continue;
				}
        
        // 만약 방문한적도 없고 모든 조건이 오케이다 하면
        // 그떄 스택 위에 valid한 다음 셀을 넣는거
        const nextCell = this.board[nextCellRow][nextCellCol];
        // 이 아래는 DFS랑 큰 연관은 없지만 나중에 길을 찾았을때 traceback 하기 위해
        // 셀 클래스 오브젝트에 parent 어트리뷰트를 따로 설정해놨음
        nextCell.parent = currCell;
				this.stack.push(nextCell);
			}

		}

    return [path, null];
	}
}
