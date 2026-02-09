import React, { FunctionComponent, useState } from 'react'
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '../constants'

export const BoardSizeInput: FunctionComponent<{ onCreateGame: (size: number) => void }> = ({ onCreateGame }) => {
  const [displayValue, setDisplayValue] = useState<string>(() => String(MIN_BOARD_SIZE))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value)
  }

  const handleStartGame = () => {
    const num = Number(displayValue)
    const size = Number.isNaN(num)
      ? MIN_BOARD_SIZE
      : Math.min(MAX_BOARD_SIZE, Math.max(MIN_BOARD_SIZE, Math.round(num)))
    setDisplayValue(String(size))
    onCreateGame(size)
  }

  return (
    <>
    <div className='flex items-center gap-2'>
      <label htmlFor='board-size' className='font-bold'>Board Size:</label>
      <input
        id='board-size'
        type='number'
        min={MIN_BOARD_SIZE}
        max={MAX_BOARD_SIZE}
        value={displayValue}
        onChange={handleChange}
        className='w-16 border-2 border-gray-900 px-2 py-1'
      />
      <span className='text-sm text-gray-600'>(Minimum {MIN_BOARD_SIZE} – Maximum {MAX_BOARD_SIZE})</span>
    </div>
      <button
        type='button'
        onClick={handleStartGame}
        className='font-bold border-2 border-gray-900 px-3 py-1 cursor-pointer'
      >
        Start Game
      </button>
      </>
  )
}
