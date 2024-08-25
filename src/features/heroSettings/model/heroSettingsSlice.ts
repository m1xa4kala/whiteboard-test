import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { heroSettingsState } from './types'

const initialState: heroSettingsState = {
  playerSpeed: 5,
  playerFireRate: 5,
  enemySpeed: 5,
  enemyFireRate: 5,
}

export const heroSettingsSlice = createSlice({
  name: 'heroSettings',
  initialState: initialState,
  reducers: {
    setPlayerSpeed: (state, action: PayloadAction<number>) => {
      state.playerSpeed = action.payload
    },
    setPlayerFireRate: (state, action: PayloadAction<number>) => {
      state.playerFireRate = action.payload
    },
    setEnemySpeed: (state, action: PayloadAction<number>) => {
      state.enemySpeed = action.payload
    },
    setEnemyFireRate: (state, action: PayloadAction<number>) => {
      state.enemyFireRate = action.payload
    },
  },
})

export const { setPlayerSpeed, setEnemySpeed, setPlayerFireRate, setEnemyFireRate } = heroSettingsSlice.actions

export default heroSettingsSlice.reducer
