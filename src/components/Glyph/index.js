import { useEffect } from 'react'
import useCanvas from '../../canvas/useCanvas'
import useFrames from '../../canvas/useFrames'
import './index.scss'

const a = (frame, start, end, func) => {
  if (typeof end === 'function') {
    if (frame > start) return end()
  } else {
    if (frame > start && frame <= end) return func()
  }
}

const circ = (context, x, y, r, size, segment) => {
  const arcMod = (2 / size) * Math.PI
  context.beginPath()
  context.arc(x, y, r, 0, (segment + 1) * arcMod)
  context.stroke()
}

const arc = (context, x, y, r, size, segment) => {
  const arcMod = (2 / size) * Math.PI
  context.beginPath()
  context.arc(x, y, r, arcMod * segment, (segment + 1) * arcMod)
  context.stroke()
}

const line = (context, x1, y1, x2, y2, size, segment) => {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
}

const Glyph = () => {
  const { ref, context } = useCanvas()
  const { frame, setFrame } = useFrames()

  useEffect(() => {
    if (!context) return

    context.clearRect(0, 0, ref.current.width, ref.current.height)
    context.translate(100, 100)
    context.lineWidth = 3
    context.lineJoin = 'round'
    context.strokeStyle = 'black'

    a(frame, 0, () => circ(context, 0, 0, 80, 12, frame > 12 ? 12 : frame))
    a(frame, 16, () => circ(context, 0, 0, 98, 16, frame - 16 > 16 ? 16 : frame - 16))

    context.strokeStyle = 'cyan'
    context.lineWidth = 5
    a(frame, 24, 56, () => arc(context, 0, 0, 98, 16, frame % 16))
    context.strokeStyle = 'black'
    context.lineWidth = 3

    a(frame, 32, () => circ(context, 0, -42, 15, 4, frame - 32 > 3 ? 4 : frame - 32))

    context.strokeStyle = 'cyan'
    context.lineWidth = 5
    a(frame, 56, 88, () => arc(context, 0, 0, 80, 16, frame % 16))
    context.strokeStyle = 'black'
    context.lineWidth = 3

    a(frame, 36, () => line(context, -15, -45, 0, -80))
    a(frame, 37, () => line(context, 0, -80, 15, -45))
    a(frame, 38, () => line(context, 0, -27, 74, 30))
    a(frame, 39, () => line(context, 74, 30, -74, 30))
    a(frame, 40, () => line(context, -74, 30, 0, -27))
    a(frame, 41, () => line(context, 0, -27, 0, 80))
    a(frame, 42, () => line(context, -13, 8, 13, -8))
    a(frame, 43, () => line(context, -13, 20, 13, 4))

    context.translate(-100, -100)
  }, [ref, context, frame])

  const handleClear = () => {
    context.clearRect(0, 0, ref.current.width, ref.current.height)
    setFrame(0)
  }

  return (
    <div className='glyph'>
      <canvas width='200' height='200' ref={ref} />
      <div><button onClick={handleClear}>{frame}</button></div>
    </div>
  )
}

export default Glyph
