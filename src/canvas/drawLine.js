const drawLine = (context, path, startFrame, currentFrame, duration) => {
  if (currentFrame < startFrame) return

  const step = currentFrame - startFrame
  const totalLength = getDistance(path)
  const currentTravel = step / duration * totalLength
  let soFar = 0

  context.beginPath()
  context.moveTo(path[0][0], path[0][1])
  path.forEach((pos, i) => {
    if (!i) return
    const start = path[i - 1]
    const end = pos
    const segmentLength = getDistance([start, end])
    const remainingLength = currentTravel - soFar

    if (remainingLength > segmentLength) {
      soFar = soFar + segmentLength
      context.lineTo(end[0], end[1])
    } else if (remainingLength > 0) {
      soFar = soFar + remainingLength
      const mod = remainingLength / segmentLength
      const x = start[0] + (end[0] - start[0]) * mod
      const y = start[1] + (end[1] - start[1]) * mod
      context.lineTo(x, y)
    }
  })

  context.stroke()
}

const getDistance = path => {
  return path.reduce((total, pt, i) => {
    if (!i) return total

    return total + Math.sqrt(Math.pow(pt[0] - path[i - 1][0], 2) + Math.pow(pt[1] - path[i - 1][1], 2))
  }, 0)
}

export default drawLine
