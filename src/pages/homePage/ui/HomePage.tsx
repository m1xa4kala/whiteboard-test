import React from 'react'
import { GameBoard } from '@/widgets/gameBoard'
import { GameScore } from '@/widgets/gameScore'
import { HeroSettings } from '@/features/heroSettings'
import { useAppSelector } from '@/shared/lib'
import './HomePage.scss'

export const HomePage: React.FC = () => {
  const isGameStarted = useAppSelector((store) => store.gameBoard.isGameStarted)
  const playerSpeed = useAppSelector((store) => store.heroSettings.playerSpeed)
  const playerFireRate = useAppSelector((store) => store.heroSettings.playerFireRate)
  const playerColor = useAppSelector((store) => store.heroColor.playerColor)
  const playerSpellColor = useAppSelector((store) => store.heroColor.playerSpellColor)
  const enemySpeed = useAppSelector((store) => store.heroSettings.enemySpeed)
  const enemyFireRate = useAppSelector((store) => store.heroSettings.enemyFireRate)
  const enemyColor = useAppSelector((store) => store.heroColor.enemyColor)
  const enemySpellColor = useAppSelector((store) => store.heroColor.enemySpellColor)
  return (
    <main className='home-page'>
      {isGameStarted && <GameScore />}
      <div className='game-board-container' style={isGameStarted ? {} : { marginTop: '66px' }}>
        {!isGameStarted && <HeroSettings hero='player' speed={playerSpeed} fireRate={playerFireRate} />}

        <GameBoard
          width={600}
          height={600}
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
        {!isGameStarted && <HeroSettings hero='enemy' speed={enemySpeed} fireRate={enemyFireRate} />}
      </div>
    </main>
  )
}
