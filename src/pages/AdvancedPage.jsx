import { Link, useParams } from 'react-router-dom'
import CuteMascots from '../components/CuteMascots'
import { ADVANCED_STAGES } from '../constants/advancedStages'
import Advanced1Composer from './advanced/Advanced1Composer'
import './StagePage.css'
import './AdvancedPage.css'

const ADVANCED_MISSIONS = {
  1: Advanced1Composer,
}

function AdvancedPage() {
  const { stageId } = useParams()
  const stageInfo = ADVANCED_STAGES.find((s) => String(s.id) === stageId)
  const MissionComponent = ADVANCED_MISSIONS[Number(stageId)]
  const nextStage = ADVANCED_STAGES.find((s) => s.id === Number(stageId) + 1)

  return (
    <div className="page stage-page advanced-page">
      <CuteMascots />
      <header className="page-header">
        <Link to="/" className="ghost-button">
          ← 메인으로
        </Link>
        <h1>응용 {stageId}단계</h1>
        <span className="badge">{stageInfo?.title ?? '준비 중'}</span>
        {nextStage && (
          <Link to={`/advanced/${nextStage.id}`} className="ghost-button stage-page__next">
            다음 단계 →
          </Link>
        )}
      </header>

      <div className="stage-body">
        {MissionComponent ? (
          <MissionComponent />
        ) : (
          <div className="mission-card">
            <p className="mission-card__label">응용 미션</p>
            <p className="mission-card__placeholder">{stageInfo?.description ?? '준비 중입니다.'}</p>
            <p className="mission-card__soon">이 단계는 곧 만들어질 예정이에요</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedPage
