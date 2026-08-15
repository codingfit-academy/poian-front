import { useMemo } from 'react'
import { WHITE_KEYS } from '../constants/piano'
import './SheetMusic.css'

// 오단선 위 계이름 위치: 아래 줄(E4)을 0으로 두고 한 칸(도 -> 레)마다 1씩 증가
const STEP_BY_NOTE = {
  C4: -2,
  D4: -1,
  E4: 0,
  F4: 1,
  G4: 2,
  A4: 3,
  B4: 4,
  C5: 5,
  D5: 6,
  E5: 7,
  F5: 8,
  G5: 9,
}

const NOTES_PER_LINE = 8
const LINE_COUNT = 2
const LINE_GAP = 26
const HALF_STEP = LINE_GAP / 2
const LEFT_MARGIN = 90
const NOTE_GAP = 76
const RIGHT_MARGIN = 50
const STAFF_WIDTH = LEFT_MARGIN + NOTE_GAP * (NOTES_PER_LINE - 1) + RIGHT_MARGIN
const SYSTEM_HEIGHT = 230
const BOTTOM_Y = 150

// 이 컴포넌트는 미션(성공/실패 판정)과는 무관한 읽기 연습용 장식 악보입니다.
function generateRandomSheet() {
  return Array.from({ length: LINE_COUNT }, () =>
    Array.from({ length: NOTES_PER_LINE }, () => WHITE_KEYS[Math.floor(Math.random() * WHITE_KEYS.length)]),
  )
}

function StaffSystem({ notes }) {
  const topLineY = BOTTOM_Y - 4 * LINE_GAP
  const startBarX = LEFT_MARGIN - 26
  const midBarX = LEFT_MARGIN + 3.5 * NOTE_GAP
  const endBarX1 = LEFT_MARGIN + (NOTES_PER_LINE - 1) * NOTE_GAP + 26
  const endBarX2 = endBarX1 + 8

  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          className="staff-line"
          x1={startBarX - 6}
          x2={endBarX2 + 6}
          y1={BOTTOM_Y - i * LINE_GAP}
          y2={BOTTOM_Y - i * LINE_GAP}
        />
      ))}

      <text className="clef" x={LEFT_MARGIN - 72} y={BOTTOM_Y - 6}>
        𝄞
      </text>

      <line className="bar-line" x1={startBarX} x2={startBarX} y1={BOTTOM_Y} y2={topLineY} />
      <line className="bar-line" x1={midBarX} x2={midBarX} y1={BOTTOM_Y} y2={topLineY} />
      <line className="bar-line" x1={endBarX1} x2={endBarX1} y1={BOTTOM_Y} y2={topLineY} />
      <line className="bar-line bar-line--end" x1={endBarX2} x2={endBarX2} y1={BOTTOM_Y} y2={topLineY} />

      {notes.map((note, i) => {
        const step = STEP_BY_NOTE[note.note]
        const x = LEFT_MARGIN + i * NOTE_GAP
        const y = BOTTOM_Y - step * HALF_STEP
        const stemUp = step <= 4
        // 덧줄은 오선 밖으로 나간 "줄" 위치(짝수 step)에만 그린다. 칸 위치(홀수 step)는 필요 없다.
        const needsLedger = step % 2 === 0 && (step < 0 || step > 8)

        return (
          <g key={i}>
            {needsLedger && <line className="ledger-line" x1={x - 18} x2={x + 18} y1={y} y2={y} />}
            <ellipse className="note-head" cx={x} cy={y} rx={11} ry={8.5} transform={`rotate(-18 ${x} ${y})`} />
            <line
              className="note-stem"
              x1={stemUp ? x + 10 : x - 10}
              x2={stemUp ? x + 10 : x - 10}
              y1={y}
              y2={stemUp ? y - 60 : y + 60}
            />
            <text className="note-syllable" x={x} y={y + 30}>
              {note.label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function SheetMusic() {
  const sheet = useMemo(() => generateRandomSheet(), [])

  return (
    <div className="sheet-music">
      <svg
        className="sheet-music__svg"
        viewBox={`0 0 ${STAFF_WIDTH} ${SYSTEM_HEIGHT * LINE_COUNT}`}
        role="img"
        aria-label="랜덤으로 생성된 도레미 읽기 연습 악보"
      >
        {sheet.map((notes, i) => (
          <g key={i} transform={`translate(0, ${i * SYSTEM_HEIGHT})`}>
            <StaffSystem notes={notes} />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default SheetMusic
