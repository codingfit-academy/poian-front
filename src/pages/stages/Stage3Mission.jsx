import SequencePianoMission from '../../components/SequencePianoMission'

function Stage3Mission() {
  return (
    <SequencePianoMission
      instruction="손목을 꺾지 않고 도레미파솔라시도를 순서대로 쳐보세요 🤚"
      failTitle="손목이 꺾였어요!"
      failSubtitle="손목을 곧게 펴고 다시 쳐보세요"
      checkpointLabel="🤚 손목 곧게 유지 중"
    />
  )
}

export default Stage3Mission
