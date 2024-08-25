import { heroColorSlice } from '@/features/colorChange'
import { heroSettingsSlice } from '@/features/heroSettings'
import { gameBoardSlice } from '@/widgets/gameBoard'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    gameBoard: gameBoardSlice.reducer,
    heroColor: heroColorSlice.reducer,
    heroSettings: heroSettingsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
