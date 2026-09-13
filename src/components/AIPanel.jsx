/**
 * AIPanel.jsx
 * Displays the four AI concepts powering the puzzle.
 * State changes reactively as the user solves manually or watches the Oracle.
 */

const CONCEPTS = [
  {
    id:   'csp',
    name: 'CSP',
    desc: {
      idle:    'Backtracking Search ready',
      solving: 'Assigning & backtracking variables',
      solved:  'Unique solution found',
    },
  },
  {
    id:   'agent',
    name: 'Logical Agent',
    desc: {
      idle:    'Perceive \u2192 Reason \u2192 Act',
      solving: 'Perceiving clues, inferring solution',
      solved:  'Goal state achieved',
    },
  },
  {
    id:   'fol',
    name: 'FOL',
    desc: {
      idle:    'See FOL tab on the scroll',
      solving: 'Clue predicates being evaluated',
      solved:  'All predicates satisfied',
    },
  },
  {
    id:   'prolog',
    name: 'Prolog',
    desc: {
      idle:    'See Prolog tab on the scroll',
      solving: 'Horn clauses & constraints active',
      solved:  'All clauses resolved',
    },
  },
]

export default function AIPanel({ isSolving, gameWon }) {
  const state = isSolving ? 'solving' : gameWon ? 'solved' : 'idle'

  const titleMap = {
    idle:    'AI Concepts powering this puzzle',
    solving: 'Oracle is reasoning — CSP Backtracking active',
    solved:  'Oracle has spoken — all constraints satisfied',
  }

  return (
    <div className={`ai-panel ai-state-${state}`}>

      {/* Header bar */}
      <div className="ai-panel-head">
        <span className="ai-dot" />
        <span className="ai-panel-title">{titleMap[state]}</span>
      </div>

      {/* Four concept chips */}
      <div className="ai-chips">
        {CONCEPTS.map(c => {
          const isPulsing = state === 'solving' && (c.id === 'csp' || c.id === 'agent')
          return (
            <div
              key={c.id}
              className={`ai-chip chip-${c.id} ai-state-${state} ${isPulsing ? 'chip-pulse' : ''}`}
            >
              <span className="chip-name">{c.name}</span>
              <span className="chip-desc">{c.desc[state]}</span>
            </div>
          )
        })}
      </div>

    </div>
  )
}
