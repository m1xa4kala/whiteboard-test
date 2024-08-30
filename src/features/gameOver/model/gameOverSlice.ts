import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  isGameOver: boolean
  targetScore: number
  winner: string
}

type payloadType = {
  isGameOver: boolean
  winner: string
}

const initialState: initialStateType = {
  isGameOver: false,
  targetScore: 10,
  winner: '',
}

export const gameOverSlice = createSlice({
  name: 'gameOver',
  initialState,
  reducers: {
    setGameOver: (state, action: PayloadAction<payloadType>) => {
      state.isGameOver = action.payload.isGameOver
      state.winner = action.payload.winner
    },

    setTargetScore: (state, action: PayloadAction<number>) => {
      state.targetScore = action.payload
    },
  },
})

export const { setGameOver, setTargetScore } = gameOverSlice.actions

export default gameOverSlice.reducer
