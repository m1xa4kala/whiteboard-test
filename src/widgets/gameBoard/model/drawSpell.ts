import { Settings } from './types'

export const drawSpell = (ctx: CanvasRenderingContext2D, settings: Settings, xCoord: number, yCoord: number) => {
  ctx.beginPath()
  ctx.arc(xCoord, yCoord, 4, 0, Math.PI * 2, true)
  ctx.lineWidth = 1
  ctx.fillStyle = settings.spellColor
  ctx.fill()
}
