import { useEffect, useRef, useState } from 'react'
import './CuteMascots.css'

const CHARACTERS = [
  { id: 'bear-1', emoji: '🐻', tone: 'butter' },
  { id: 'bear-2', emoji: '🐻', tone: 'pink' },
  { id: 'piglet-1', emoji: '🐷', tone: 'pink' },
  { id: 'piglet-2', emoji: '🐷', tone: 'sky' },
  { id: 'donkey-1', emoji: '🐴', tone: 'lavender' },
  { id: 'donkey-2', emoji: '🐴', tone: 'mint' },
  { id: 'rabbit', emoji: '🐰', tone: 'sky' },
  { id: 'tiger', emoji: '🐯', tone: 'butter' },
]

function randomSpot() {
  return {
    x: 6 + Math.random() * 80,
    y: 16 + Math.random() * 64,
  }
}

function CuteMascots() {
  const [spots] = useState(() => CHARACTERS.map(() => randomSpot()))
  const nodeRefs = useRef([])
  const faceRefs = useRef([])

  useEffect(() => {
    const timers = nodeRefs.current.map((node, i) => {
      if (!node) return null
      let prevX = spots[i].x

      const wander = () => {
        const next = randomSpot()
        const dir = next.x < prevX ? -1 : 1
        node.style.left = `${next.x}%`
        node.style.top = `${next.y}%`
        const face = faceRefs.current[i]
        if (face) face.style.transform = `scaleX(${dir})`
        prevX = next.x
        return setTimeout(wander, 4500 + Math.random() * 3500)
      }

      return setTimeout(wander, i * 550)
    })

    return () => timers.forEach((t) => t && clearTimeout(t))
  }, [spots])

  return (
    <div className="cute-mascots" aria-hidden="true">
      {CHARACTERS.map((c, i) => (
        <span
          key={c.id}
          ref={(el) => { nodeRefs.current[i] = el }}
          className={`cute-mascot cute-mascot--${c.tone}`}
          style={{ left: `${spots[i].x}%`, top: `${spots[i].y}%` }}
        >
          <span className="cute-mascot__ribbon">🎀</span>
          <span className="cute-mascot__face" ref={(el) => { faceRefs.current[i] = el }}>
            {c.emoji}
          </span>
        </span>
      ))}
    </div>
  )
}

export default CuteMascots
