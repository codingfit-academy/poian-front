import { useCallback, useEffect, useRef, useState } from 'react'

export function useCamera() {
  const streamRef = useRef(null)
  const videoNodeRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState(null)

  const attachStream = useCallback((node) => {
    if (node && streamRef.current) {
      node.srcObject = streamRef.current
    }
  }, [])

  // <video>는 stage 전환 이후에야 DOM에 마운트되므로, 콜백 ref로 마운트 시점에 스트림을 붙인다.
  const videoRef = useCallback(
    (node) => {
      videoNodeRef.current = node
      attachStream(node)
    },
    [attachStream],
  )

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setIsActive(false)
  }, [])

  const start = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })
      streamRef.current = stream
      attachStream(videoNodeRef.current)
      setIsActive(true)
      return true
    } catch {
      setError('카메라를 사용할 수 없어요. 권한을 확인하고 다시 시도해주세요.')
      setIsActive(false)
      return false
    }
  }, [attachStream])

  useEffect(() => stop, [stop])

  return { videoRef, start, stop, isActive, error }
}
