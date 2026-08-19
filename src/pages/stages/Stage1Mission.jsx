import SequencePianoMission from '../../components/SequencePianoMission'

function Stage1Mission() {
  return (
    <SequencePianoMission
      instruction="도레미파솔라시도를 순서대로 배우고 치면서 읽어보세요"
      failTitle="경고! 경고!"
      failSubtitle="실패했습니다"
    />
  )
}

export default Stage1Mission
