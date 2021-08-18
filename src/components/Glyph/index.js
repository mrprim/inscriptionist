import { useEffect } from 'react'
import useCanvas from '../../canvas/useCanvas'
import drawLine from '../../canvas/drawLine'
import drawCircle from '../../canvas/drawCircle'
import { easeInQuad } from '../../animation/easing'
import './index.scss'

const Glyph = ({ frame, className, onClick }) => {
  const { ref, context } = useCanvas()

  useEffect(() => {
    if (!context) return

    context.clearRect(0, 0, ref.current.width, ref.current.height)
    context.translate(120, 120)
    context.lineWidth = 3
    context.lineJoin = 'round'
    context.strokeStyle = 'black'

    drawCircle(context, 0, 0, 0, 98, frame, 16, easeInQuad)
    drawCircle(context, 18, 0, 0, 80, frame, 12, easeInQuad)

    drawLine(context, 32, [[-15, -42], [0, -80], [15, -42]], frame, 8, easeInQuad)
    drawCircle(context, 40, 0, -42, 15, frame, 8, easeInQuad)

    drawLine(context, 48, [[0, -27], [74, 30], [-74, 30], [0, -27], [0, 80]], frame, 18, easeInQuad)
    drawLine(context, 66, [[-13, 8], [13, -8]], frame, 4, easeInQuad)
    drawLine(context, 70, [[-13, 20], [13, 4]], frame, 4, easeInQuad)

    // Glow

    if (frame < 100) {
      context.lineWidth = 8
      context.strokeStyle = 'orange'
      drawCircle(context, 88, 0, 0, 98, frame, 4)
      drawCircle(context, 88, 0, 0, 80, frame, 4)
      drawLine(context, 88, [[-15, -42], [0, -80], [15, -42]], frame, 4)
      drawCircle(context, 88, 0, -42, 15, frame, 4)
      drawLine(context, 88, [[0, -27], [74, 30], [-74, 30], [0, -27], [0, 80]], frame, 4)
      drawLine(context, 88, [[-13, 8], [13, -8]], frame, 4)
      drawLine(context, 88, [[-13, 20], [13, 4]], frame, 4)
    }

    context.translate(-120, -120)
  }, [ref, context, frame])

  const classes = ['glyph', className || '', onClick ? 'clickable' : '']

  return (
    <div className={classes.join(' ')} onClick={onClick}>
      <canvas width='240' height='240' ref={ref} />
    </div>
  )
}

export default Glyph
