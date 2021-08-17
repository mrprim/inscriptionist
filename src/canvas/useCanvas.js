import { useRef, useState, useEffect } from 'react'

const useCanvas = () => {
  const ref = useRef(null)
  const [context, setCtx] = useState()

  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    setCtx(context)
  }, [])

  return { context, ref }
}

export default useCanvas
