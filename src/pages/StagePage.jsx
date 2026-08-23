import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCamera } from '../hooks/useCamera'
import CuteMascots from '../components/CuteMascots'
import { STAGES } from '../constants/stages'
import Stage1Mission from './stages/Stage1Mission'
import Stage2Mission from './stages/Stage2Mission'
import Stage3Mission from './stages/Stage3Mission'
import Stage4Mission from './stages/Stage4Mission'
import Stage5Mission from './stages/Stage5Mission'
import Stage6Mission from './stages/Stage6Mission'
import Stage7Mission from './stages/Stage7Mission'
import Stage8Mission from './stages/Stage8Mission'
import Stage9Mission from './stages/Stage9Mission'
import Stage10Mission from './stages/Stage10Mission'
import './StagePage.css'

const STAGE_MISSIONS = {
  1: Stage1Mission,
  2: Stage2Mission,
  3: Stage3Mission,
  4: Stage4Mission,
  5: Stage5Mission,
  6: Stage6Mission,
  7: Stage7Mission,
  8: Stage8Mission,
  9: Stage9Mission,
  10: Stage10Mission,
}

function StagePage() {
  const { stageId } = useParams()
  const { videoRef, start, error } = useCamera()
  const stageInfo = STAGES.find((s) => String(s.id) === stageId)
  const MissionComponent = STAGE_MISSIONS[Number(stageId)]
  const nextStage = STAGES.find((s) => s.id === Number(stageId) + 1)

  useEffect(() => {
    start()
  }, [start])

  return (
    <div className="page">
      <CuteMascots />
      <header className="page-header">
        <Link to="/" className="ghost-button">
          ← 단계 선택
        </Link>
        <h1>{stageId}단계</h1>
        <span className="badge">{stageInfo?.title ?? '미션 준비 중'}</span>
        {nextStage && (
          <Link to={`/stage/${nextStage.id}`} className="ghost-button stage-page__next">
            다음 단계 →
          </Link>
        )}
      </header>

      <div className="stage-body">
        {MissionComponent ? (
          <MissionComponent />
        ) : (
          <div className="mission-card">
            <p className="mission-card__label">미션</p>
            <p className="mission-card__placeholder">{stageInfo?.description ?? '준비 중입니다.'}</p>
            <p className="mission-card__soon">이 단계는 곧 만들어질 예정이에요</p>
          </div>
        )}
      </div>

      <div className="camera-corner">
        <video ref={videoRef} autoPlay playsInline muted className="camera-corner__video" />
        {error && <p className="camera-corner__error">{error}</p>}
      </div>
    </div>
  )
}

export default StagePage
