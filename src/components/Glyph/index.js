import { useRef, useEffect, useState } from 'react'
import './index.scss'

const a = (tick, start, end, func) => {
  if (typeof end === 'function') {
    if (tick > start) return end()
  } else {
    if (tick > start && tick <= end) return func()
  }
}

const circ = (ctx, x, y, r, size, segment) => {
  const arcMod = (2 / size) * Math.PI
  ctx.beginPath()
  ctx.arc(x, y, r, 0, (segment + 1) * arcMod)
  ctx.stroke()
}

const arc = (ctx, x, y, r, size, segment) => {
  const arcMod = (2 / size) * Math.PI
  ctx.beginPath()
  ctx.arc(x, y, r, arcMod * segment, (segment + 1) * arcMod)
  ctx.stroke()
}

const line = (ctx, x1, y1, x2, y2, size, segment) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

const Glyph = () => {
  const canvasRef = useRef(null)
  const [tick, setTick] = useState(0)
  const [ctx, setCtx] = useState()

  useEffect(() => {
    if (tick >= 200) return
    setTimeout(() => setTick(t => t + 1), 50)
  }, [setTick, tick])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    setCtx(ctx)
  }, [])

  useEffect(() => {
    if (!ctx) return

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.translate(100, 100)
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.strokeStyle = 'black'

    a(tick, 0, () => circ(ctx, 0, 0, 80, 12, tick > 12 ? 12 : tick))
    a(tick, 16, () => circ(ctx, 0, 0, 98, 16, tick - 16 > 16 ? 16 : tick - 16))

    ctx.strokeStyle = 'cyan'
    ctx.lineWidth = 5
    a(tick, 24, 56, () => arc(ctx, 0, 0, 98, 16, tick % 16))
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3

    a(tick, 32, () => circ(ctx, 0, -42, 15, 4, tick - 32 > 3 ? 4 : tick - 32))

    ctx.strokeStyle = 'cyan'
    ctx.lineWidth = 5
    a(tick, 56, 88, () => arc(ctx, 0, 0, 15, 16, tick % 16))
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3

    a(tick, 36, () => line(ctx, -15, -45, 0, -80))
    a(tick, 37, () => line(ctx, 0, -80, 15, -45))
    a(tick, 38, () => line(ctx, 0, -27, 74, 30))
    a(tick, 39, () => line(ctx, 74, 30, -74, 30))
    a(tick, 40, () => line(ctx, -74, 30, 0, -27))
    a(tick, 41, () => line(ctx, 0, -27, 0, 80))
    a(tick, 42, () => line(ctx, -13, 8, 13, -8))
    a(tick, 43, () => line(ctx, -13, 20, 13, 4))

    ctx.translate(-100, -100)
  }, [ctx, tick])

  const handleClear = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setTick(0)
  }

  return (
    <div className='glyph'>
      <canvas width='200' height='200' ref={canvasRef} />
      <div><button onClick={handleClear}>{tick}</button></div>
    </div>
  )
}

export default Glyph
