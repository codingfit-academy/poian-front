import { useEffect, useState } from 'react'
import PianoKeyboard from './PianoKeyboard'
import StarRating from './StarRating'
import { usePianoSound } from '../hooks/usePianoSound'
import { STAGE1_NOTES, STAGE1_SEQUENCE } from '../constants/piano'
import './SequencePianoMission.css'

// 실제 AI 인식(음정/손동작)이 붙기 전까지의 임시 판정 로직: 건반을 정해진 순서대로 누르는지로 대체
function SequencePianoMission({
  instruction,
  failTitle,
  failSubtitle,
  checkpointLabel,
  sequence = STAGE1_SEQUENCE,
  notes = STAGE1_NOTES,
  timeLimitMs,
  timeoutTitle,
  timeoutSubtitle,
  renderProgress,
}) {
  const [phase, setPhase] = useState('ready') // ready | playing | fail | success
  const [pointer, setPointer] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [stars, setStars] = useState(0)
  const [startedAt, setStartedAt] = useState(null)
  const [failReason, setFailReason] = useState('wrong') // 'wrong' | 'timeout'
  const [remainingMs, setRemainingMs] = useState(timeLimitMs ?? null)
  const sound = usePianoSound()

  useEffect(() => {
    if (phase !== 'playing' || !timeLimitMs) return undefined
    const tick = setInterval(() => {
      setRemainingMs((prev) => (prev === null ? prev : prev - 200))
    }, 200)
    return () => clearInterval(tick)
  }, [phase, timeLimitMs])

  useEffect(() => {
    if (phase === 'playing' && timeLimitMs && remainingMs !== null && remainingMs <= 0) {
      sound.playWarning()
      setFailReason('timeout')
      setPhase('fail')
    }
  }, [remainingMs, phase, timeLimitMs, sound])

  const beginAttempt = () => {
    setPointer(0)
    setMistakes(0)
    setStartedAt(Date.now())
    setRemainingMs(timeLimitMs ?? null)
    setFailReason('wrong')
    setPhase('playing')
  }

  const handleKeyPress = (key) => {
    sound.playNote(key.freq)
    if (phase !== 'playing') return

    const expected = sequence[pointer]
    if (key.note !== expected) {
      setMistakes((m) => m + 1)
      sound.playWarning()
      setFailReason('wrong')
      setPhase('fail')
      return
    }

    const nextPointer = pointer + 1
    if (nextPointer === sequence.length) {
      const elapsed = Date.now() - (startedAt ?? Date.now())
      const timeStars = elapsed <= 6000 ? 3 : elapsed <= 12000 ? 2 : 1
      const finalStars = mistakes === 0 ? timeStars : mistakes <= 2 ? Math.min(timeStars, 2) : 1
      setStars(finalStars)
      sound.playSuccess()
      setPhase('success')
    } else {
      setPointer(nextPointer)
    }
  }

  const shownFailTitle = failReason === 'timeout' ? timeoutTitle ?? failTitle : failTitle
  const shownFailSubtitle = failReason === 'timeout' ? timeoutSubtitle ?? failSubtitle : failSubtitle

  return (
    <div className="sequence-mission">
      <p className="sequence-mission__label">미션</p>
      <p className="sequence-mission__instruction">{instruction}</p>

      {phase === 'ready' && (
        <button type="button" className="big-button big-button--accent" onClick={beginAttempt}>
          시작하기
        </button>
      )}

      {phase === 'playing' && (
        <div className="sequence-mission__progress">
          <p className="status-text">
            {renderProgress ? (
              renderProgress(pointer, sequence.length)
            ) : (
              <>
                다음 음: <strong>{notes[pointer]?.label}</strong> ({pointer}/{sequence.length})
              </>
            )}
          </p>
          {checkpointLabel && <p className="sequence-mission__checkpoint">{checkpointLabel}</p>}
          {timeLimitMs != null && (
            <p className="sequence-mission__timer">⏱ {Math.max(0, Math.ceil((remainingMs ?? 0) / 1000))}초</p>
          )}
        </div>
      )}

      {phase === 'fail' && (
        <div className="sequence-mission__result sequence-mission__result--fail">
          <p className="sequence-mission__result-title">{shownFailTitle}</p>
          <p className="sequence-mission__result-subtitle">{shownFailSubtitle}</p>
          <button type="button" className="big-button" onClick={beginAttempt}>
            다시 하기
          </button>
        </div>
      )}

      {phase === 'success' && (
        <div className="sequence-mission__result sequence-mission__result--success">
          <p className="sequence-mission__result-title">성공했습니다!</p>
          <StarRating count={stars} />
          <button type="button" className="big-button" onClick={beginAttempt}>
            다시 도전하기
          </button>
        </div>
      )}

      <div className="sequence-mission__piano">
        <PianoKeyboard nextNote={phase === 'playing' ? sequence[pointer] : null} onPlay={handleKeyPress} />
      </div>
    </div>
  )
}

export default SequencePianoMission
