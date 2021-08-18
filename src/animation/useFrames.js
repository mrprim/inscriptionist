import { useCallback, useEffect, useState } from 'react'

const useFrames = ({ autostart = true }) => {
  const [frame, setFrame] = useState(0)
  const [running, setRunning] = useState(autostart)

  const play = useCallback(() => {
    setRunning(true)
  }, [setRunning])

  const stop = useCallback(() => {
    setRunning(false)
  }, [setRunning])

  const reset = useCallback(() => {
    setFrame(0)
  }, [setFrame])

  useEffect(() => {
    if (!running) return
    setTimeout(() => setFrame(t => {
      if (frame !== t) return t
      return t + 1
    }), 1000 / 24)
  }, [setFrame, frame, running])

  return { frame, setFrame, running, play, stop, reset }
}

export default useFrames
