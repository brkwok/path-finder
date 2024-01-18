// 6 types: cell-empty, cell-probe, cell-path-found, cell-wall, cell-start, cell-end
export class DefaultCell {
	constructor(row, col) {
		this.type = "cell-empty"
		this.row = row
		this.col = col
		this.parent = null;
		this.opac = 1;
	}
}
