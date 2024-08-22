import { Settings } from './types'

export const drawHero = (ctx: CanvasRenderingContext2D, settings: Settings, xCoord: number, yCoord: number) => {
  ctx.beginPath()
  ctx.arc(xCoord, yCoord, 30, 0, Math.PI * 2, true)
  ctx.lineWidth = 4
  ctx.strokeStyle = settings.color
  ctx.stroke()
}
