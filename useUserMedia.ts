import { useEffect, useState } from 'react'

const useUserMedia = (): MediaStream | null => {
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const enableStream = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        setStream(localStream)
      } catch (error) {
        console.error(error)
      }
    }
    if (!stream) {
      enableStream()
    } else {
      return function cleanup() {
        stream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [stream])
  return stream
}

export default useUserMedia
