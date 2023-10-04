import { useCallback, useEffect, useState } from 'react'

const useFrames = ({ length = 100, loop = false, autostart = true }) => {
  const [frame, setFrame] = useState(0)
  const [running, setRunning] = useState(autostart)

  const play = useCallback(() => {
    if (frame > length) {
      setFrame(0)
    }
    setRunning(true)
  }, [frame, length, setRunning])

  const stop = useCallback(() => {
    setRunning(false)
  }, [setRunning])

  const reset = useCallback(() => {
    setFrame(0)
  }, [setFrame])

  useEffect(() => {
    if (!running) return
    if (frame > length) {
      if (loop) {
        setFrame(0)
      } else {
        setRunning(false)
        return
      }
    }
    setTimeout(() => setFrame(t => {
      if (frame !== t) return t
      return t + 1
    }), 1000 / 24)
  }, [setFrame, frame, running, setRunning, length, loop])

  return { frame, setFrame, running, play, stop, reset, length }
}

export default useFrames
