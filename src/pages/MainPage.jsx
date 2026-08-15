import { Link } from 'react-router-dom'
import PianoKeyboard from '../components/PianoKeyboard'
import SheetMusic from '../components/SheetMusic'
import { usePianoSound } from '../hooks/usePianoSound'
import { STAGES } from '../constants/stages'
import './MainPage.css'

function MainPage() {
  const sound = usePianoSound()

  return (
    <div className="page">
      <header className="page-header">
        <h1>피아노 손동작 경고</h1>
        <span className="badge">스테이지를 선택해주세요</span>
      </header>

      <div className="main-body">
        <section className="left-panel">
          <div className="stage-grid">
            {STAGES.map((stage) => (
              <Link key={stage.id} to={`/stage/${stage.id}`} className="stage-button">
                <span className="stage-button__number">{stage.id}</span>
                <span className="stage-button__title">{stage.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="right-panel">
          <h2 className="piano-title">피아노</h2>
          <div className="piano-scroll">
            <SheetMusic />
            <PianoKeyboard nextNote={null} onPlay={(key) => sound.playNote(key.freq)} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default MainPage
