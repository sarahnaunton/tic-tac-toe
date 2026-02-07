import React from 'react'
import { Game } from './components/game/game'

export const Main = () => {
  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <h1 className='font-bold text-2xl'>Tic Tac Toe</h1>
      <Game />
    </div>
  )
}
