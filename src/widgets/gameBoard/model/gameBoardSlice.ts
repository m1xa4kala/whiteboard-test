import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameBoardState, Color } from './types'

const initialState: GameBoardState = {
  isGameStarted: false,
  playerScore: 0,
  enemyScore: 0,
  playerColor: Color.red,
  enemyColor: Color.blue,
}

export const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState: initialState,
  reducers: {
    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload
    },
    setPlayerColor: (state, action: PayloadAction<Color>) => {
      state.playerColor = action.payload
    },
    setEnemyColor: (state, action: PayloadAction<Color>) => {
      state.enemyColor = action.payload
    },
    increasePlayerScore: (state) => {
      state.playerScore += 1
    },
    increaseEnemyScore: (state) => {
      state.enemyScore += 1
    },
  },
})

export const { setIsGameStarted, setPlayerColor, setEnemyColor, increasePlayerScore, increaseEnemyScore } = gameBoardSlice.actions
export default gameBoardSlice.reducer
