import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const Controls = ({ play, running, stop }) =>
  <div className='controls'>
    <PlayPauseButton running={running} play={play} stop={stop} />
  </div>

const PlayPauseButton = ({ running, play, stop }) =>
  <div>
    {running ? <FontAwesomeIcon icon='pause' onClick={stop} /> : <FontAwesomeIcon icon='play' onClick={play} />}
  </div>

export default Controls
