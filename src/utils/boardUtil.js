import { DefaultCell } from "./Cell"
import { ROWS, COLS } from "./constants"

export const createBoard = () => {
  const board = Array.from({length: ROWS}, () => {
    return Array.from({length: COLS}, () => new DefaultCell())
  })

  return board
}