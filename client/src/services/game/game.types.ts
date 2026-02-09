import { XorO } from '../../types'
import { GamePlayer } from '../gamePlayer/gamePlayer.types'

export type GameStatus = 'ABANDONED' | 'IN_PROGRESS' | 'COMPLETED'
export type GameOutcome = 'WIN' | 'DRAW' | 'UNKNOWN'

export interface Game {
  id: string,
  status: GameStatus,
  outcome: GameOutcome,
  winnerPlayerId: string | null,
  boardSize: number,
  completedAt: string | null,
  gamePlayers: GamePlayer[]
}

export interface CreateGame {
  boardSize: number, 
  playerSymbols: PlayerSymbols[]
}

export interface PlayerSymbols {
  playerId: string,
  symbol: XorO,
}

