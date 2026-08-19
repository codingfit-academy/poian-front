import SequencePianoMission from '../../components/SequencePianoMission'
import { STAGE1_NOTES, STAGE1_SEQUENCE } from '../../constants/piano'

const REPEATS = 3
const STAGE6_SEQUENCE = STAGE1_SEQUENCE.flatMap((note) => Array(REPEATS).fill(note))
const STAGE6_NOTES = STAGE1_NOTES.flatMap((note) => Array(REPEATS).fill(note))

function Stage6Mission() {
  return (
    <SequencePianoMission
      instruction="도도도 레레레 미미미…시시시를 정해진 시간 안에 빠르게 쳐보세요 (한 손) ⏱"
      failTitle="아쉬워요!"
      failSubtitle="순서를 다시 확인하고 도전해보세요"
      timeLimitMs={20000}
      timeoutTitle="시간 초과!"
      timeoutSubtitle="더 빠르게 쳐보세요"
      sequence={STAGE6_SEQUENCE}
      notes={STAGE6_NOTES}
    />
  )
}

export default Stage6Mission
