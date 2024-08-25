import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { heroSettingsState } from './types'

const localPlayerSpeed = localStorage.getItem('playerSpeed')
const localPlayerFireRate = localStorage.getItem('playerFireRate')
const localEnemySpeed = localStorage.getItem('enemySpeed')
const localEnemyFireRate = localStorage.getItem('enemyFireRate')

const initialState: heroSettingsState = {
  playerSpeed: localPlayerFireRate ? Number(localPlayerSpeed) : 3,
  playerFireRate: localPlayerSpeed ? Number(localPlayerFireRate) : 3,
  enemySpeed: localEnemySpeed ? Number(localEnemySpeed) : 3,
  enemyFireRate: localEnemyFireRate ? Number(localEnemyFireRate) : 3,
}

export const heroSettingsSlice = createSlice({
  name: 'heroSettings',
  initialState: initialState,
  reducers: {
    setPlayerSpeed: (state, action: PayloadAction<number>) => {
      state.playerSpeed = action.payload
      localStorage.setItem('playerSpeed', action.payload.toString())
    },
    setPlayerFireRate: (state, action: PayloadAction<number>) => {
      state.playerFireRate = action.payload
      localStorage.setItem('playerFireRate', action.payload.toString())
    },
    setEnemySpeed: (state, action: PayloadAction<number>) => {
      state.enemySpeed = action.payload
      localStorage.setItem('enemySpeed', action.payload.toString())
    },
    setEnemyFireRate: (state, action: PayloadAction<number>) => {
      state.enemyFireRate = action.payload
      localStorage.setItem('enemyFireRate', action.payload.toString())
    },
  },
})

export const { setPlayerSpeed, setEnemySpeed, setPlayerFireRate, setEnemyFireRate } = heroSettingsSlice.actions

export default heroSettingsSlice.reducer
