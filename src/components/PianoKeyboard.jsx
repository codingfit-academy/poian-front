import { WHITE_KEYS, BLACK_KEYS } from '../constants/piano'
import './PianoKeyboard.css'

const WHITE_KEY_WIDTH = 56
const WHITE_KEY_HEIGHT = 260
const BLACK_KEY_WIDTH = 34
const BLACK_KEY_HEIGHT = 160

function PianoKeyboard({ nextNote, onPlay }) {
  return (
    <div
      className="piano-keyboard"
      style={{ width: WHITE_KEYS.length * WHITE_KEY_WIDTH, height: WHITE_KEY_HEIGHT }}
    >
      {WHITE_KEYS.map((key, i) => (
        <button
          key={key.note}
          type="button"
          onClick={() => onPlay(key)}
          className={`piano-key piano-key--white${nextNote === key.note ? ' piano-key--next' : ''}`}
          style={{ left: i * WHITE_KEY_WIDTH, width: WHITE_KEY_WIDTH, height: WHITE_KEY_HEIGHT }}
        >
          <span className="piano-key__label">{key.label}</span>
        </button>
      ))}
      {BLACK_KEYS.map((key) => (
        <button
          key={key.note}
          type="button"
          onClick={() => onPlay(key)}
          className={`piano-key piano-key--black${nextNote === key.note ? ' piano-key--next' : ''}`}
          style={{
            left: (key.afterIndex + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2,
            width: BLACK_KEY_WIDTH,
            height: BLACK_KEY_HEIGHT,
          }}
        />
      ))}
    </div>
  )
}

export default PianoKeyboard
