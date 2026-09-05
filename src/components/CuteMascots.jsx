import './CuteMascots.css'

const POOH_IMAGE = '/images/곰돌이 푸.jpg'

const CHARACTERS = [
  { id: 'pooh-1', tone: 'butter', x: 4, y: 12 },
  { id: 'pooh-2', tone: 'sky', x: 92, y: 14 },
  { id: 'pooh-3', tone: 'pink', x: 5, y: 82 },
  { id: 'pooh-4', tone: 'mint', x: 90, y: 80 },
]

function CuteMascots() {
  return (
    <div className="cute-mascots" aria-hidden="true">
      {CHARACTERS.map((c) => (
        <span
          key={c.id}
          className={`cute-mascot cute-mascot--${c.tone}`}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          <span className="cute-mascot__ribbon">🎀</span>
          <span className="cute-mascot__face">
            <img className="cute-mascot__img" src={POOH_IMAGE} alt="곰돌이 푸" />
          </span>
        </span>
      ))}
    </div>
  )
}

export default CuteMascots
