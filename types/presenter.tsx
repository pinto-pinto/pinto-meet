import { useState } from 'react'
import Disconnect from '../public/disconnect'
import Mute from '../public/mute'
import Share from '../public/share'
import UnShare from '../public/un-share'
import UnMute from '../public/unmute'
import Video from '../types/video'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Presenter = (props: { stream: MediaStream; disconnect: () => void }) => {
  const [micActivated, setMicActivated] = useState<boolean>(true)
  const [screenCaptureActivated, setScreenCapture] = useState<boolean>(false)

  // eslint-disable-next-line no-undef
  let muteButton: JSX.IntrinsicElements['button']
  // eslint-disable-next-line no-undef
  let shareButton: JSX.IntrinsicElements['button']

  const activateMicrophone = () => {
    setMicActivated(true)
    const audioTracks = props.stream.getAudioTracks()
    audioTracks.forEach((track) => {
      track.enabled = true
    })
  }

  const deactivateMicrophone = () => {
    setMicActivated(false)
    const audioTracks = props.stream.getAudioTracks()
    audioTracks.forEach((track) => {
      track.enabled = false
    })
  }

  const startScreenCapture = () => {
    setScreenCapture(true)
  }

  const endScreenCapture = () => {
    setScreenCapture(false)
  }

  if (micActivated) {
    muteButton = (
      <button onClick={deactivateMicrophone}>
        <UnMute />
      </button>
    )
  } else {
    muteButton = (
      <button onClick={activateMicrophone}>
        <Mute />
      </button>
    )
  }

  if (screenCaptureActivated) {
    shareButton = (
      <button disabled={true} onClick={endScreenCapture}>
        <UnShare />
      </button>
    )
  } else {
    shareButton = (
      <button disabled={true} onClick={startScreenCapture}>
        <Share />
      </button>
    )
  }

  return (
    <div className='flex'>
      <div className='relative'>
        <Video stream={props.stream} muted={true} />
        <div className='absolute inset-x-0 bottom-2'>
          <div className='flex justify-evenly'>
            {muteButton}
            {shareButton}
            <button onClick={props.disconnect}>
              <Disconnect />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Presenter
