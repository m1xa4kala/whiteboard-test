import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameBoardState, PlayerColor } from './types'

const initialState: GameBoardState = {
  isGameStarted: false,
  playerColor: PlayerColor.red,
  enemyColor: PlayerColor.blue,
}

export const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState: initialState,
  reducers: {
    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload
    },
    setPlayerColor: (state, action: PayloadAction<PlayerColor>) => {
      state.playerColor = action.payload
    },
    setEnemyColor: (state, action: PayloadAction<PlayerColor>) => {
      state.enemyColor = action.payload
    },
  },
})

export const { setIsGameStarted, setPlayerColor, setEnemyColor } = gameBoardSlice.actions
export default gameBoardSlice.reducer
