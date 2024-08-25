import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Color } from './types'

const localPlayerColor = localStorage.getItem('playerColor')
const localPlayerSpellColor = localStorage.getItem('playerSpellColor')
const localEnemyColor = localStorage.getItem('enemyColor')
const localEnemySpellColor = localStorage.getItem('enemySpellColor')

const initialState = {
  enemyMenuOpen: false,
  playerMenuOpen: false,
  playerColor: localPlayerColor ? (localPlayerColor as Color) : Color.blue,
  playerSpellColor: localPlayerSpellColor ? (localPlayerSpellColor as Color) : Color.green,
  enemyColor: localEnemyColor ? (localEnemyColor as Color) : Color.red,
  enemySpellColor: localEnemySpellColor ? (localEnemySpellColor as Color) : Color.purple,
}

export const heroColorSlice = createSlice({
  name: 'heroColor',
  initialState: initialState,
  reducers: {
    setPlayerColor: (state, action: PayloadAction<Color>) => {
      state.playerColor = action.payload
      localStorage.setItem('playerColor', action.payload.toString())
    },
    setEnemyColor: (state, action: PayloadAction<Color>) => {
      state.enemyColor = action.payload
      localStorage.setItem('enemyColor', action.payload.toString())
    },

    setPlayerSpellColor: (state, action: PayloadAction<Color>) => {
      state.playerSpellColor = action.payload
      localStorage.setItem('playerSpellColor', action.payload.toString())
    },
    setEnemySpellColor: (state, action: PayloadAction<Color>) => {
      state.enemySpellColor = action.payload
      localStorage.setItem('enemySpellColor', action.payload.toString())
    },

    setPlayerMenuOpen: (state) => {
      state.playerMenuOpen = !state.playerMenuOpen
      state.enemyMenuOpen = false
    },
    setEnemyMenuOpen: (state) => {
      state.enemyMenuOpen = !state.enemyMenuOpen
      state.playerMenuOpen = false
    },
  },
})

export const { setPlayerColor, setEnemyColor, setPlayerSpellColor, setEnemySpellColor, setPlayerMenuOpen, setEnemyMenuOpen } =
  heroColorSlice.actions

export default heroColorSlice.reducer
