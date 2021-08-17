import { useEffect, useState } from 'react'

const useFrames = () => {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (frame >= 200) return
    setTimeout(() => setFrame(t => {
      if (frame !== t) return t
      return t + 1
    }), 1000 / 24)
  }, [setFrame, frame])

  return { frame, setFrame }
}

export default useFrames
