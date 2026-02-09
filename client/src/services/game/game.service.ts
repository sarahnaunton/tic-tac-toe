import httpClient from '../httpClient'
import { CreateGame, Game } from './game.types'

export async function createGame(game: CreateGame): Promise<Game> {
  const { data } = await httpClient.post<Game>('/api/games', game)
  return data
}

export async function abandonGame(gameId: string): Promise<Game> {
  const { data } = await httpClient.patch<Game>(`/api/games/${gameId}/abandon`)
  return data
}

export async function completeGame( gameId: string, outcome: 'WIN' | 'DRAW', winnerPlayerId?: string): Promise<Game> {
  const { data } = await httpClient.patch<Game>(`/api/games/${gameId}/complete`, { outcome, winnerPlayerId })
  return data
}