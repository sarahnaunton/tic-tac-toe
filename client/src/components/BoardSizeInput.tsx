import React, { FunctionComponent, useState } from 'react'
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '../constants'

export const BoardSizeInput: FunctionComponent<{ onCreateGame: (size: number) => void }> = ({ onCreateGame }) => {
  const [displayValue, setDisplayValue] = useState<string>(() => String(MIN_BOARD_SIZE))
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value)
  }

  const handleStartGame = () => {
    const number = Number(displayValue)
    if (Number.isNaN(number)) {
      setErrorMessage('Board size must be a number')
      return
    }
    if (number < MIN_BOARD_SIZE || number > MAX_BOARD_SIZE) {
      setErrorMessage(`Board size must be between ${MIN_BOARD_SIZE} and ${MAX_BOARD_SIZE}`)
      return
    }
    setErrorMessage(null)
    onCreateGame(number)
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
      </div>
      {errorMessage && (
        <p className='text-red-600 text-sm' role='alert'>{errorMessage}</p>
      )}
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
