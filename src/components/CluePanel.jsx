import { useState } from 'react'
import { clueToFOL, clueToProlog, FOL_LEGEND, PROLOG_LEGEND } from '../engine/logic'

const TABS = [
  { id: 'scroll', label: 'Scroll'  },
  { id: 'fol',    label: 'FOL'     },
  { id: 'prolog', label: 'Prolog'  },
]

// ─── Legend row ───────────────────────────────────────────────────────────────
function Legend({ items }) {
  return (
    <div className="logic-legend">
      {items.map(item => (
        <div key={item.symbol} className="legend-row">
          <code className="legend-symbol">{item.symbol}</code>
          <span className="legend-meaning">{item.meaning}</span>
        </div>
      ))}
    </div>
  )
}

// ─── CluePanel ────────────────────────────────────────────────────────────────
export default function CluePanel({ clues }) {
  const [activeTab, setActiveTab] = useState('scroll')
  const [showLegend, setShowLegend] = useState(false)

  return (
    <div className="clue-panel">

      {/* Header */}
      <div className="clue-panel-head">
        <h2 className="clue-panel-title">The Ancient Scroll</h2>
        <div className="scroll-rule" />
      </div>

      {/* Tab bar */}
      <div className="clue-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`clue-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab.id); setShowLegend(false) }}
          >
            {tab.label}
          </button>
        ))}

        {/* Legend toggle — only shown on FOL / Prolog tabs */}
        {(activeTab === 'fol' || activeTab === 'prolog') && (
          <button
            className="clue-tab legend-toggle"
            onClick={() => setShowLegend(v => !v)}
            title="Toggle symbol legend"
          >
            {showLegend ? 'Hide Key' : 'Show Key'}
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="clue-list">

        {/* ── Scroll tab (natural language) ────────────────────────── */}
        {activeTab === 'scroll' && clues.map(clue => (
          <div key={clue.id} className="clue-item">
            <span className="clue-num">{clue.id}.</span>
            <span className="clue-text">{clue.text}</span>
          </div>
        ))}

        {/* ── FOL tab ──────────────────────────────────────────────── */}
        {activeTab === 'fol' && (
          <>
            <p className="logic-intro">
              Each clue translated into First Order Logic notation.
            </p>

            {showLegend && <Legend items={FOL_LEGEND} />}

            {clues.map(clue => (
              <div key={clue.id} className="clue-item logic-clue-item">
                <span className="clue-num">{clue.id}.</span>
                <div className="logic-entry">
                  <code className="fol-formula">{clueToFOL(clue)}</code>
                  <span className="logic-source">{clue.text}</span>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Prolog tab ────────────────────────────────────────────── */}
        {activeTab === 'prolog' && (
          <>
            <p className="logic-intro">
              Each clue expressed as Prolog facts, Horn clauses, or integrity constraints.
            </p>

            {showLegend && <Legend items={PROLOG_LEGEND} />}

            {clues.map(clue => (
              <div key={clue.id} className="clue-item logic-clue-item">
                <span className="clue-num">{clue.id}.</span>
                <div className="logic-entry">
                  <pre className="prolog-code">{clueToProlog(clue)}</pre>
                  <span className="logic-source">{clue.text}</span>
                </div>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  )
}
