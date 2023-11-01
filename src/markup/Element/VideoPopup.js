import React,{useState} from 'react'
//import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'

const VideoPopup = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <React.Fragment>
      <ModalVideo channel='youtube' autoPlay isOpen={isOpen} videoId="DfeFDZ9P4n8" onClose={() => setOpen(false)} />
      <button className="popup-youtube video border-0" onClick={()=> setOpen(true)} ><i className="fa fa-play" ></i></button>
    </React.Fragment>
  )
}

export default VideoPopup;