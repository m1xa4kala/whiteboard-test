import React from 'react'
import { GameBoard } from '@/widgets/gameBoard'
import { GameScore } from '@/widgets/gameScore'
import { HeroSettings } from '@/features/heroSettings'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { setCanvasSize } from '@/widgets/gameBoard'
import './HomePage.scss'

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const isGameStarted = useAppSelector((store) => store.gameBoard.isGameStarted)
  const playerSpeed = useAppSelector((store) => store.heroSettings.playerSpeed)
  const playerFireRate = useAppSelector((store) => store.heroSettings.playerFireRate)
  const playerColor = useAppSelector((store) => store.heroColor.playerColor)
  const playerSpellColor = useAppSelector((store) => store.heroColor.playerSpellColor)
  const enemySpeed = useAppSelector((store) => store.heroSettings.enemySpeed)
  const enemyFireRate = useAppSelector((store) => store.heroSettings.enemyFireRate)
  const enemyColor = useAppSelector((store) => store.heroColor.enemyColor)
  const enemySpellColor = useAppSelector((store) => store.heroColor.enemySpellColor)
  const canvasWidth = useAppSelector((store) => store.gameBoard.canvasWidth)
  const canvasHeight = useAppSelector((store) => store.gameBoard.canvasHeight)

  React.useEffect(() => {
    const windowWidth = window.innerWidth
    if (windowWidth < 800) {
      dispatch(setCanvasSize({ canvasWidth: windowWidth, canvasHeight: 360 }))
    }
  }, [dispatch])

  return (
    <main className='home-page'>
      {isGameStarted && <GameScore />}
      <div className='game-board-container' style={isGameStarted ? {} : { marginTop: '66px' }}>
        <div className='player-settings'>
          {!isGameStarted && <HeroSettings hero='player' speed={playerSpeed} fireRate={playerFireRate} />}
        </div>
        <div className='game-board'>
          <GameBoard
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            isGameStarted={isGameStarted}
            playerSettings={{
              color: playerColor,
              speed: playerSpeed,
              spellColor: playerSpellColor,
              fireRate: playerFireRate,
            }}
            enemySettings={{
              color: enemyColor,
              speed: enemySpeed,
              spellColor: enemySpellColor,
              fireRate: enemyFireRate,
            }}
          />
        </div>
        <div className='enemy-settings'>{!isGameStarted && <HeroSettings hero='enemy' speed={enemySpeed} fireRate={enemyFireRate} />}</div>
      </div>
    </main>
  )
}
