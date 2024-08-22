import { drawSpell } from './drawSpell'
import { Settings } from './types'

export const drawHero = (ctx: CanvasRenderingContext2D, settings: Settings, xCoord: number, yCoord: number, spellSize: number = 6) => {
  ctx.beginPath()
  ctx.arc(xCoord, yCoord, 30, 0, Math.PI * 2, true)
  ctx.lineWidth = 4
  ctx.strokeStyle = settings.color
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(xCoord, yCoord, spellSize, 0, Math.PI * 2, true)
  ctx.lineWidth = 1
  ctx.fillStyle = settings.spellColor
  ctx.fill()
  settings.projectiles.forEach((projectile) => {
    drawSpell(ctx, settings, projectile.x, projectile.y)
  })
}
