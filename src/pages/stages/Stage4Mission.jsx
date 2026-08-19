import { useState } from 'react'
import PianoKeyboard from '../../components/PianoKeyboard'
import { usePianoSound } from '../../hooks/usePianoSound'
import { STAGE1_NOTES } from '../../constants/piano'
import './Stage4Mission.css'

function Stage4Mission() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('learning') // learning | done
  const sound = usePianoSound()
  const current = STAGE1_NOTES[index]
  const hand = index % 2 === 0 ? '오른손' : '왼손'

  const handleNext = () => {
    if (index + 1 >= STAGE1_NOTES.length) {
      setPhase('done')
    } else {
      setIndex((i) => i + 1)
    }
  }

  const handleRestart = () => {
    setIndex(0)
    setPhase('learning')
  }

  return (
    <div className="stage4-mission">
      <p className="stage4-mission__label">미션</p>
      <p className="stage4-mission__instruction">
        도레미파솔라시도와 다라마바사가나다를 배우고 따라 말해보세요
      </p>

      {phase === 'learning' && current && (
        <div className="stage4-mission__card">
          <p className="stage4-mission__hand">{hand}으로 짚어보세요</p>
          <p className="stage4-mission__names">
            <span>{current.label}</span>
            <span className="stage4-mission__divider">·</span>
            <span>{current.koreanLabel}</span>
          </p>
          <p className="status-text">{index + 1} / {STAGE1_NOTES.length}</p>
          <div className="button-row">
            <button type="button" className="big-button" onClick={() => sound.playNote(current.freq)}>
              🔊 소리 듣기
            </button>
            <button type="button" className="big-button big-button--accent" onClick={handleNext}>
              따라 말했어요, 다음
            </button>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="stage4-mission__result">
          <p className="stage4-mission__result-title">학습 완료! 🎉</p>
          <p className="stage4-mission__result-subtitle">도레미파솔라시도 = 다라마바사가나다</p>
          <button type="button" className="big-button" onClick={handleRestart}>
            처음부터 다시 학습하기
          </button>
        </div>
      )}

      <div className="stage4-mission__piano">
        <PianoKeyboard
          nextNote={phase === 'learning' ? current.note : null}
          onPlay={(key) => sound.playNote(key.freq)}
        />
      </div>
    </div>
  )
}

export default Stage4Mission
