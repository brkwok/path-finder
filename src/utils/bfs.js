import { ROWS, COLS } from "./constants";

// 링크리스트의 노드역할
class Node {
	constructor(data = null, next = null, prev = null) {
		this.data = data;
		this.next = next;
		this.prev = prev;
	}
}

// Doubly-Linked-List, 데큐 데이터 스트럭쳐를 위한 다른 데이터 스트럭쳐
class LinkedList {
	constructor() {
		// dummy node
		this.head = new Node();
		this.tail = new Node();
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}
	// 리스트가 비어있는지 확인
	isEmpty() {
		return this.head.next === this.tail;
	}

	// 리스트의 맨 뒤에 데이터를 추가
	push(node) {
		const currLast = this.tail.prev;

		currLast.next = node;
		node.prev = currLast;
		node.next = this.tail;
		this.tail.prev = node;
	}

	pushLeft(node) {
		const first = this.head.next;
		this.head.next = node;
		node.prev = this.head;
		node.next = first;
		first.prev = node;
	}

	popLeft() {
		if (this.isEmpty()) {
			return null;
		}

		const first = this.head.next;
		const second = first.next;

		this.head.next = second;
		second.prev = this.head;

		return first;
	}

	pop() {
		if (this.isEmpty()) {
			return null;
		}

		const last = this.tail.prev;
		const secondLast = last.prev;

		this.tail.prev = secondLast;
		secondLast.next = this.tail;

		return last;
	}

	printLL() {
		let curr = this.head.next;

		let data = []
		while (curr !== this.tail) {
			data.push(curr.data);
			curr = curr.next;
		}

		console.log(data)
	}
}

// 일반 큐는 무조건 first in first out인데
// deque 디큐는 앞뒤 자유로움
class Deque {
	constructor() {
		this.ll = new LinkedList();
	}

	// linkedList가 비어있을때
	// head의 다음이 테일이면 true 리턴 하면 됨
	isEmpty() {
		return this.ll.isEmpty();
	}

	// 제일 첫번쨰 데이터를 리스트에서 뺴오고 싶음
	popLeft() {
		return this.ll.popLeft();
	}

	// 리스트 뒤에있는걸 빼오고 싶음
	pop() {
		return this.ll.pop();
	}

	// 제일 첫번쨰에 데이터를 리스트에 집어넣고싶음
	pushLeft(data) {
		const node = new Node(data);
		this.ll.pushLeft(node);
	}

	// 리스트 뒤에 추가하고싶음
	push(data) {
		const node = new Node(data);
		this.ll.push(node);
	}
}

export class BFS {
	dirs = [
		[0, -1],
		[1, 0],
		[0, 1],
		[-1, 0],
	];

	constructor(start, end, board) {
		this.queue = new Deque();
		this.start = start;
		this.end = end;
		this.board = board;
	}

	findPath() {
		if (!this.start || !this.end) {
			console.log("Start or End Missing");
			return [[], null];
		}

		const path = [];
		const seen = new Set();
		this.queue.push(this.start);

		while (!this.queue.isEmpty()) {
			const currCell = this.queue.popLeft().data;

			if (!seen.has(currCell)) {
				path.push(currCell);
			}
			seen.add(currCell);

			if (currCell === this.end) {
				return [path, currCell];
			}

			const row = currCell.row;
			const col = currCell.col;

			for (let [r,c] of this.dirs) {
				const nextCellRow = row + r;
				const nextCellCol = col + c;

				if (
					Math.min(nextCellRow, nextCellCol) < 0 ||
					nextCellRow >= ROWS ||
					nextCellCol >= COLS ||
					this.board[nextCellRow][nextCellCol].type === "cell-wall" ||
					seen.has(this.board[nextCellRow][nextCellCol])
				) {
					continue;
				}

				const nextCell = this.board[nextCellRow][nextCellCol];
	      nextCell.parent = currCell;
				this.queue.push(nextCell);
			}
		}

		return [path, null];
	}
}