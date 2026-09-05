import './Advanced1Composer.css'

const COMPOSER = {
  name: '볼프강 아마데우스 모차르트',
  englishName: 'Wolfgang Amadeus Mozart',
  years: '1756년 ~ 1791년',
  initials: 'W.A.M',
  facts: [
    { icon: '📍', label: '태어난 곳', value: '오스트리아 잘츠부르크' },
    { icon: '🎂', label: '태어난 날', value: '1756년 1월 27일' },
    { icon: '🕊️', label: '세상을 떠난 날', value: '1791년 12월 5일, 오스트리아 빈' },
    { icon: '👶', label: '어린 시절', value: '5살 때부터 작곡을 시작한 신동으로 불렸어요' },
  ],
  works: [
    '작은 별 변주곡 (반짝반짝 작은 별)',
    '터키 행진곡',
    '아이네 클라이네 나흐트무지크',
    '오페라 〈마술피리〉',
  ],
  funFact: '모차르트는 평생 600곡이 넘는 곡을 작곡했고, 어릴 때 유럽 여러 나라를 다니며 연주 여행을 했어요.',
}

function Advanced1Composer() {
  return (
    <div className="composer-card">
      <div className="composer-card__avatar">{COMPOSER.initials}</div>
      <h3 className="composer-card__name">{COMPOSER.name}</h3>
      <p className="composer-card__english">{COMPOSER.englishName}</p>
      <p className="composer-card__years">{COMPOSER.years}</p>

      <div className="composer-card__facts">
        {COMPOSER.facts.map((fact) => (
          <div className="composer-card__fact" key={fact.label}>
            <span className="composer-card__fact-icon">{fact.icon}</span>
            <div className="composer-card__fact-text">
              <p className="composer-card__fact-label">{fact.label}</p>
              <p className="composer-card__fact-value">{fact.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="composer-card__works">
        <p className="composer-card__section-title">🎹 대표곡</p>
        <ul className="composer-card__works-list">
          {COMPOSER.works.map((work) => (
            <li key={work}>{work}</li>
          ))}
        </ul>
      </div>

      <div className="composer-card__funfact">
        <p className="composer-card__section-title">✨ 재미있는 사실</p>
        <p className="composer-card__funfact-text">{COMPOSER.funFact}</p>
      </div>
    </div>
  )
}

export default Advanced1Composer
