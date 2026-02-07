import React, { FunctionComponent } from 'react'
import { Square } from './square'
import { Grid } from '../../types'

export const Board: FunctionComponent<{ board: Grid, onSquareClick: (rowIndex: number, colIndex: number) => void }> = ({ board, onSquareClick }) => {
  return (
    <div className='flex flex-col gap-1'>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-1'>
          {row.map((column, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              value={column}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
