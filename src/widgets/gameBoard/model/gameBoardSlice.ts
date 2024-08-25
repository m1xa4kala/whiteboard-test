import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameBoardState } from './types'

const initialState: GameBoardState = {
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
  },
})

export const { setIsGameStarted, increasePlayerScore, increaseEnemyScore } = gameBoardSlice.actions
export default gameBoardSlice.reducer
