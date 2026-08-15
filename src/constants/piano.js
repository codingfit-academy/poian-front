export const WHITE_KEYS = [
  { note: 'C4', freq: 261.63, label: '도' },
  { note: 'D4', freq: 293.66, label: '레' },
  { note: 'E4', freq: 329.63, label: '미' },
  { note: 'F4', freq: 349.23, label: '파' },
  { note: 'G4', freq: 392.0, label: '솔' },
  { note: 'A4', freq: 440.0, label: '라' },
  { note: 'B4', freq: 493.88, label: '시' },
  { note: 'C5', freq: 523.25, label: '도' },
  { note: 'D5', freq: 587.33, label: '레' },
  { note: 'E5', freq: 659.25, label: '미' },
  { note: 'F5', freq: 698.46, label: '파' },
  { note: 'G5', freq: 783.99, label: '솔' },
]

// afterIndex: WHITE_KEYS 중 이 인덱스와 다음 인덱스 사이에 놓이는 검은 건반
export const BLACK_KEYS = [
  { note: 'C#4', freq: 277.18, afterIndex: 0 },
  { note: 'D#4', freq: 311.13, afterIndex: 1 },
  { note: 'F#4', freq: 369.99, afterIndex: 3 },
  { note: 'G#4', freq: 415.3, afterIndex: 4 },
  { note: 'A#4', freq: 466.16, afterIndex: 5 },
  { note: 'C#5', freq: 554.37, afterIndex: 7 },
  { note: 'D#5', freq: 622.25, afterIndex: 8 },
  { note: 'F#5', freq: 739.99, afterIndex: 10 },
]

// 1단계: 도레미파솔라시도
export const STAGE1_NOTES = WHITE_KEYS.slice(0, 8)
export const STAGE1_SEQUENCE = STAGE1_NOTES.map((key) => key.note)
