import { gameScoreSlice } from '@/widgets/gameScore'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    gameScore: gameScoreSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
