import React, { FunctionComponent } from 'react'
import { Cell } from '../types'

export const Square: FunctionComponent<{ value: Cell, onClick: () => void }> = ({ value, onClick }) => {
  return (
    <button
      type='button'
      className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex bg-transparent p-0'
      onClick={onClick}
    >
      {value}
    </button>
  )
}
