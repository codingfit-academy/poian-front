import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCamera } from '../hooks/useCamera'
import { STAGES } from '../constants/stages'
import './StagePage.css'

function StagePage() {
  const { stageId } = useParams()
  const { videoRef, start, error } = useCamera()
  const stageInfo = STAGES.find((s) => String(s.id) === stageId)

  useEffect(() => {
    start()
  }, [start])

  return (
    <div className="page">
      <header className="page-header">
        <Link to="/" className="ghost-button">
          ← 스테이지 선택
        </Link>
        <h1>스테이지 {stageId}</h1>
        <span className="badge">{stageInfo?.title ?? '미션 준비 중'}</span>
      </header>

      <div className="stage-body">
        <div className="mission-card">
          <p className="mission-card__label">미션</p>
          <p className="mission-card__placeholder">
            {stageInfo?.title ?? `스테이지 ${stageId}`} 미션 영역
            <br />
            (준비 중)
          </p>
        </div>
      </div>

      <div className="camera-corner">
        <video ref={videoRef} autoPlay playsInline muted className="camera-corner__video" />
        {error && <p className="camera-corner__error">{error}</p>}
      </div>
    </div>
  )
}

export default StagePage
