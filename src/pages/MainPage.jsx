import { Link } from 'react-router-dom'
import BackgroundFX from '../components/BackgroundFX'
import PianoKeyboard from '../components/PianoKeyboard'
import SheetMusic from '../components/SheetMusic'
import { usePianoSound } from '../hooks/usePianoSound'
import { STAGES } from '../constants/stages'
import { ADVANCED_STAGES } from '../constants/advancedStages'
import './MainPage.css'

function MainPage() {
  const sound = usePianoSound()

  return (
    <div className="page main-page">
      <BackgroundFX />
      <header className="page-header">
        <h1>피아노 손동작 경고</h1>
        <span className="badge">단계를 선택해주세요</span>
      </header>

      <div className="main-body">
        <div className="stage-columns">
          <section className="stage-column stage-column--applied">
            <h2 className="stage-column__title">응용</h2>
            <div className="stage-grid">
              {ADVANCED_STAGES.map((stage) => (
                <Link key={stage.id} to={`/advanced/${stage.id}`} className="stage-button stage-button--advanced">
                  <span className="stage-button__number">{stage.id}단계</span>
                  <span className="stage-button__title">{stage.title}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="stage-column stage-column--mastery">
            <h2 className="stage-column__title">심화</h2>
            <div className="stage-placeholder">
              <p>심화 단계는 곧 준비할게요!</p>
              <p>조금만 기다려주세요 🌟</p>
            </div>
          </section>

          <section className="stage-column stage-column--basic">
            <h2 className="stage-column__title">기초</h2>
            <div className="stage-grid">
              {STAGES.map((stage) => (
                <Link key={stage.id} to={`/stage/${stage.id}`} className="stage-button">
                  <span className="stage-button__number">{stage.id}단계</span>
                  <span className="stage-button__title">{stage.title}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="piano-panel">
          <h2 className="piano-title">떴다 떴다 비행기</h2>
          <div className="piano-scroll">
            <div className="glass-panel">
              <SheetMusic />
              <PianoKeyboard nextNote={null} onPlay={(key) => sound.playNote(key.freq)} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MainPage
