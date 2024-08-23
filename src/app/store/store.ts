import { gameBoardSlice } from '@/widgets/gameBoard'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    gameBoard: gameBoardSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
