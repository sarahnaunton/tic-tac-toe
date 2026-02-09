export interface Move {
  id: string,
  gameId: string,
  playerId: string,
  moveNumber: number,
  positionRow: number,
  positionColumn: number,
}

export interface CreateMove {
  gameId: string,
  playerId: string,
  moveNumber: number,
  positionRow: number,
  positionColumn: number,
}