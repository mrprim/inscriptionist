import useAnimationTimeline from '../../animation/useAnimationTimeline'
import PlayerOverlay from '../PlayerOverlay'
import Glyph from '../Glyph'
import './index.scss'
import ProgressBar from '../ProgressBar'
import Controls from '../Controls'

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
  const { frame, setFrame, stop, play, length, running } = useAnimationTimeline({ length: 80 })
  const previews = [...Array(length + 1)].map((_, i) => {
    const onClick = () => setFrame(i)
    return <Glyph className={previewClassName(frame, i)} key={i} frame={i} onClick={onClick} />
  })

  return (
    <div className='player'>
      <div className='view'>
        <Glyph frame={frame} />
        <PlayerOverlay running={running} play={play} stop={stop} />
      </div>

      <ProgressBar total={length} current={frame} />
      <Controls play={play} running={running} stop={stop} />

      <div className='preview'>
        {previews}
      </div>

    </div>
  )
}

export default Player
