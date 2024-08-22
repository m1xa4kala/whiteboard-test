import { createSlice } from '@reduxjs/toolkit'

export type GameScoreState = {
  playerScore: number
  enemyScore: number
}

const initialState: GameScoreState = {
  playerScore: 0,
  enemyScore: 0,
}

export const gameScoreSlice = createSlice({
  name: 'gameScore',
  initialState: initialState,
  reducers: {
    increasePlayerScore: (state) => {
      state.playerScore += 1
    },
    increaseEnemyScore: (state) => {
      state.enemyScore += 1
    },
  },
})

export const { increasePlayerScore, increaseEnemyScore } = gameScoreSlice.actions
export default gameScoreSlice.reducer
