import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Color } from './types'

const initialState = {
  enemyMenuOpen: false,
  playerMenuOpen: false,
  playerColor: Color.blue,
  playerSpellColor: Color.green,
  enemyColor: Color.red,
  enemySpellColor: Color.purple,
}

export const heroColorSlice = createSlice({
  name: 'heroColor',
  initialState: initialState,
  reducers: {
    setPlayerColor: (state, action: PayloadAction<Color>) => {
      state.playerColor = action.payload
    },
    setEnemyColor: (state, action: PayloadAction<Color>) => {
      state.enemyColor = action.payload
    },

    setPlayerSpellColor: (state, action: PayloadAction<Color>) => {
      state.playerSpellColor = action.payload
    },
    setEnemySpellColor: (state, action: PayloadAction<Color>) => {
      state.enemySpellColor = action.payload
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
