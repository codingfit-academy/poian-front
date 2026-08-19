import SequencePianoMission from '../../components/SequencePianoMission'
import { WHITE_KEYS } from '../../constants/piano'

const PATTERN = ['C4', 'E4', 'G4', 'E4', 'C4']
const REPEATS = 10

const PATTERN_NOTES = PATTERN.map((note) => {
  const key = WHITE_KEYS.find((k) => k.note === note)
  return { ...key, label: key.koreanLabel }
})

const STAGE5_SEQUENCE = Array.from({ length: REPEATS }, () => PATTERN).flat()
const STAGE5_NOTES = Array.from({ length: REPEATS }, () => PATTERN_NOTES).flat()

function renderProgress(pointer) {
  const rep = Math.min(Math.floor(pointer / PATTERN.length) + 1, REPEATS)
  const note = STAGE5_NOTES[pointer]
  return (
    <>
      반복 {rep} / {REPEATS} · 다음 글자: <strong>{note?.label}</strong>
    </>
  )
}

function Stage5Mission() {
  return (
    <SequencePianoMission
      instruction="도미솔미도를 10번 치면서 다마사마다를 소리내어 읽어보세요 🗣️"
      failTitle="틀렸어요!"
      failSubtitle="처음부터 다시 쳐보세요"
      sequence={STAGE5_SEQUENCE}
      notes={STAGE5_NOTES}
      renderProgress={renderProgress}
    />
  )
}

export default Stage5Mission
