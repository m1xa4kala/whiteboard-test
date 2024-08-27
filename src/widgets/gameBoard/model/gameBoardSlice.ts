import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameBoardState } from './types'

const initialState: GameBoardState = {
  canvasWidth: 800,
  canvasHeight: 800,
  isGameStarted: false,
  playerScore: 0,
  enemyScore: 0,
}

export const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState: initialState,
  reducers: {
    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload
    },

    increasePlayerScore: (state) => {
      state.playerScore += 1
    },
    increaseEnemyScore: (state) => {
      state.enemyScore += 1
    },

    setCanvasSize: (state, action: PayloadAction<{ canvasWidth: number; canvasHeight: number }>) => {
      state.canvasWidth = action.payload.canvasWidth
      state.canvasHeight = action.payload.canvasHeight
    },
  },
})

export const { setIsGameStarted, increasePlayerScore, increaseEnemyScore, setCanvasSize } = gameBoardSlice.actions
export default gameBoardSlice.reducer
