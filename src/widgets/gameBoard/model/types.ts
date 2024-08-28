import { Color } from '@/features/colorChange'

export type heroSettings = {
  color: Color
  speed: number
  fireRate: number
  spellColor: Color
}

export type GameBoardProps = {
  canvasWidth: number
  canvasHeight: number
  playerSettings: heroSettings
  enemySettings: heroSettings
  isGameStarted: boolean
}

export type GameBoardState = {
  isGameStarted: boolean
  playerScore: number
  enemyScore: number
}
