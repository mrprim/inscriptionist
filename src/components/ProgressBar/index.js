import './index.scss'

const ProgressBar = ({ total, current }) =>
  <div className='progress-bar'>
    <div className='fill-bar' style={{ transform: 'scaleX(' + current / total + ')' }} />
  </div>

export default ProgressBar
