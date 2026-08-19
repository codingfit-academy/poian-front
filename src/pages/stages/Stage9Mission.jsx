import NoteQuiz from '../../components/NoteQuiz'

function Stage9Mission() {
  return (
    <NoteQuiz
      instruction="음표마다 몇 박자인지 알아보고 박자 맞히기 문제를 풀어보세요 ⏱"
      mode="beat"
      questionCount={6}
    />
  )
}

export default Stage9Mission
