import video from '../../img/main-vid.mp4'

function VideoBG() {
  return (
    <div className="video-bg">
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
    </div>
  )
}

export default VideoBG