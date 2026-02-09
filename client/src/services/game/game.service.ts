import httpClient from '../httpClient'
import { CreateGame, Game } from './game.types'

export async function createGame(game: CreateGame): Promise<Game> {
  const { data } = await httpClient.post<Game>('/api/games', game)
  return data
}