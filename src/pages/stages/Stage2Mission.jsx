import SequencePianoMission from '../../components/SequencePianoMission'

function Stage2Mission() {
  return (
    <SequencePianoMission
      instruction="카메라를 보며 달걀손 모양을 유지하면서 도레미파솔라시도를 순서대로 쳐보세요 🥚"
      failTitle="손 모양이 흐트러졌어요!"
      failSubtitle="달걀손을 다시 만들어보세요"
      checkpointLabel="🥚 달걀손 유지 중"
    />
  )
}

export default Stage2Mission
