import useFrames from '../../animation/useFrames'
import Glyph from '../Glyph'
import './index.scss'

const previewClassName = (currentFrame, displayFrame) => {
  if (currentFrame > displayFrame) {
    return 'past'
  } else if (currentFrame === displayFrame) {
    return 'present'
  } else {
    return 'future'
  }
}

const Player = () => {
  const { frame, setFrame, stop, play, reset } = useFrames({})
  const previews = [...Array(150)].map((_, i) => {
    const onClick = () => setFrame(i)
    return <Glyph className={previewClassName(frame, i)} key={i} frame={i} onClick={onClick} />
  })

  return (
    <div className='Player'>
      <Glyph frame={frame} />

      <div>
        <button onClick={() => stop()}>■</button>
        <button onClick={() => play()}>▶</button>
        <button onClick={() => reset()}>↻</button>
      </div>
      <div className='preview'>
        {previews}
      </div>

    </div>
  )
}

export default Player
