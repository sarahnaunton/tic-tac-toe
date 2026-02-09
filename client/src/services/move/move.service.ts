import httpClient from '../httpClient'
import { CreateMove, Move } from './move.types'

export async function createMove(move: CreateMove): Promise<Move> {
  const { data } = await httpClient.post<Move>('/api/moves', move)
  return data
}
