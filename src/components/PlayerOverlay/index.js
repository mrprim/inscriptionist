import './index.scss'

const Overlay = ({ running, play, stop }) =>

  <div className='player-overlay' onClick={() => running ? stop() : play()} />

export default Overlay
