// Heap이라는 데이터 스트럭쳐. Priority Queue라고도 부름
// 컴페어 펑션에 따라 제일 낮거나 높은 엘레멘트를 제일 위에 둠
export class Heap {
	constructor(arr, comparator) {
		this._heap = arr;
		this._comparator = comparator;

		this._buildHeap();
	}

	heapPush(el) {
		this._heap.push(el);
		this._percUp(this._heap.length - 1);
	}

	heapPop() {
		const size = this._heap.length;

		[this._heap[0], this._heap[size - 1]] = [
			this._heap[size - 1],
			this._heap[0],
		];

		const popped = this._heap.pop();
		this._percDown(0);
		return popped;
	}

	_buildHeap() {
		const heapSize = this._heap.length;

		for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
			this._percDown(i);
		}
	}

	_percDown(idx) {
		const heapSize = this._heap.length;

		while (idx < heapSize) {
			let curr = idx;
			let left = 2 * idx + 1;
			let right = 2 * idx + 2;

			if (
				left < heapSize &&
				this._comparator(this._heap[left], this._heap[curr]) > 0
			) {
				curr = left;
			}

			if (
				right < heapSize &&
				this._comparator(this._heap[right], this._heap[curr]) > 0
			) {
				curr = right;
			}

			if (curr !== idx) {
				[this._heap[idx], this._heap[curr]] = [
					this._heap[curr],
					this._heap[idx],
				];
			} else {
				break;
			}

			idx = curr;
		}
	}

	_percUp(idx) {
		let parentIdx = Math.floor((idx - 1) / 2);

		while (
			idx > 0 &&
			this._comparator(this._heap[idx], this._heap[parentIdx]) > 0
		) {
			[this._heap[idx], this._heap[parentIdx]] = [
				this._heap[parentIdx],
				this._heap[idx],
			];

			idx = parentIdx;
			parentIdx = Math.floor((idx - 1) / 2);
		}
	}

	isEmpty() {
		return this._heap.length === 0;
	}

	peek() {
		if (!this.isEmpty()) {
			return this._heap[0];
		} else {
			throw new Error("Heap Empty");
		}
	}
}