import { useCallback, useRef } from 'react'

export function usePianoSound() {
  const ctxRef = useRef(null)

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      ctxRef.current = new AudioContextClass()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playTone = useCallback((ctx, freq, startTime, duration, type = 'triangle', peak = 0.3) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, startTime)
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(peak, startTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(startTime)
    osc.stop(startTime + duration)
  }, [])

  const playNote = useCallback(
    (freq, duration = 0.5) => {
      const ctx = getContext()
      playTone(ctx, freq, ctx.currentTime, duration)
    },
    [getContext, playTone],
  )

  const playWarning = useCallback(() => {
    const ctx = getContext()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    gain.gain.setValueAtTime(0.22, now)
    osc.connect(gain)
    gain.connect(ctx.destination)
    const step = 0.16
    const beeps = 6
    for (let i = 0; i < beeps; i++) {
      osc.frequency.setValueAtTime(i % 2 === 0 ? 880 : 587, now + i * step)
    }
    gain.gain.setValueAtTime(0.22, now + beeps * step - 0.02)
    gain.gain.linearRampToValueAtTime(0, now + beeps * step)
    osc.start(now)
    osc.stop(now + beeps * step)
  }, [getContext])

  const playSuccess = useCallback(() => {
    const ctx = getContext()
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      playTone(ctx, freq, ctx.currentTime + i * 0.12, 0.35)
    })
  }, [getContext, playTone])

  return { playNote, playWarning, playSuccess }
}
