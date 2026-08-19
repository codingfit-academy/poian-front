import SequencePianoMission from '../../components/SequencePianoMission'
import { STAGE1_NOTES, STAGE1_SEQUENCE } from '../../constants/piano'

const REPEATS = 3
const STAGE7_SEQUENCE = STAGE1_SEQUENCE.flatMap((note) => Array(REPEATS).fill(note))
const STAGE7_NOTES = STAGE1_NOTES.flatMap((note) => Array(REPEATS).fill(note))

function Stage7Mission() {
  return (
    <SequencePianoMission
      instruction="6단계를 바탕으로 양손으로 함께 빠르게 쳐보세요 🙌"
      failTitle="아쉬워요!"
      failSubtitle="양손 호흡을 맞춰서 다시 도전해보세요"
      timeLimitMs={24000}
      timeoutTitle="시간 초과!"
      timeoutSubtitle="양손을 더 빠르게 맞춰보세요"
      sequence={STAGE7_SEQUENCE}
      notes={STAGE7_NOTES}
    />
  )
}

export default Stage7Mission
