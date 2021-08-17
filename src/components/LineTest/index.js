import { useEffect } from 'react'
import drawLine from '../../canvas/drawLine'
import useCanvas from '../../canvas/useCanvas'
import useFrames from '../../canvas/useFrames'

const LineTest = () => {
  const { ref, context } = useCanvas()
  const { frame, setFrame } = useFrames()

  useEffect(() => {
    if (!context) return

    context.clearRect(0, 0, ref.current.width, ref.current.height)
    context.translate(100, 100)
    context.lineWidth = 3
    context.lineJoin = 'round'
    context.strokeStyle = 'black'

    drawLine(context, [[0, 0], [0, 50], [50, 50], [-50, -50]], 10, frame, 24)
    context.translate(-100, -100)
  }, [ref, context, frame])

  return (
    <div>
      <canvas ref={ref} />
      <div>
        <div>{frame}</div>
        <div><button onClick={() => setFrame(0)}>Reset</button></div>
      </div>
    </div>
  )
}

export default LineTest
