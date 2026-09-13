import { useNavigate } from 'react-router-dom'
import { PUZZLES, DIFFICULTY_LABELS } from '../engine/puzzles'

const DIFF_COLOR   = { easy: '#2a8c3a', medium: '#c8960c', hard: '#8b1a1a' }
const DIFF_NUMERAL = { easy: 'I',       medium: 'II',      hard: 'III'     }

export default function PuzzleSelect() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/')}>&larr; Return</button>
        <h1 className="page-title">Choose Your Scroll</h1>
        <p className="page-subtitle">Select a puzzle to begin your deduction</p>
      </div>

      <div className="puzzle-list">
        {PUZZLES.map(puzzle => (
          <div
            key={puzzle.id}
            className="puzzle-card"
            style={{ '--diff-color': DIFF_COLOR[puzzle.difficulty] }}
            onClick={() => navigate(`/game/${puzzle.id}`)}
          >
            <div className="puzzle-card-top">
              <span className="puzzle-numeral">{DIFF_NUMERAL[puzzle.difficulty]}</span>
              <div className="puzzle-card-info">
                <span className="puzzle-diff-label">
                  {DIFFICULTY_LABELS[puzzle.difficulty]}
                </span>
                <h2 className="puzzle-name">{puzzle.name}</h2>
              </div>
              <span className="puzzle-clue-count">{puzzle.clues.length} clues</span>
            </div>
            <p className="puzzle-desc">{puzzle.description}</p>
            <div className="puzzle-enter">Enter &rarr;</div>
          </div>
        ))}
      </div>
    </div>
  )
}
