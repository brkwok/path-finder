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
		this.head = new Node();
		this.tail = new Node();
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
	isEmpty() {}

	// 제일 첫번쨰 데이터를 리스트에서 뺴오고 싶음
	popLeft() {}

	// 제일 첫번쨰에 데이터를 리스트에 집어넣고싶음
	pushLeft(data) {}

	// 리스트 뒤에 추가하고싶음
	push(data) {}

	// 리스트 뒤에있는걸 빼오고 싶음
	pop() {}
}

export class BFS {
	constructor() {
		this.queue = new Deque();
	}

	findPath() {
		return;
	}
}
