import { linear } from '../animation/easing'

const drawCircle = (context, start, x, y, r, frame, duration, easing = linear) => {
  if (frame < start) return

  const step = frame - start < duration ? frame - start : duration
  const size = easing(step, duration) * 2 * Math.PI
  context.beginPath()
  context.arc(x, y, r, 0, size)
  context.stroke()
}

export default drawCircle
