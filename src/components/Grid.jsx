import { useState } from 'react'
import {
  ADVENTURERS,
  CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_VALUES,
  CATEGORY_FOLDERS,
} from '../engine/puzzles'

// ─── Image with fallback placeholder ──────────────────────────────────────────
function ImgTile({ folder, name, size = 48 }) {
  const [errored, setErrored] = useState(false)
  const src = `/images/${folder}/${name.toLowerCase().replace(/\s+/g, '-')}.png`

  if (errored) {
    return (
      <div
        className="img-placeholder"
        style={{ width: size, height: size }}
        title={name}
      >
        {name.slice(0, 3).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className="img-tile"
      onError={() => setErrored(true)}
    />
  )
}

// ─── Value picker (bottom sheet) ──────────────────────────────────────────────
function ValuePicker({ adventurer, category, currentValue, onSelect, onClose }) {
  const values = CATEGORY_VALUES[category]
  const folder = CATEGORY_FOLDERS[category]

  return (
    <div className="picker-overlay" onClick={onClose}>
      <div className="picker-panel" onClick={e => e.stopPropagation()}>

        <div className="picker-header">
          <span className="picker-title">
            {adventurer} &mdash; {CATEGORY_LABELS[category]}
          </span>
          <button className="picker-close" onClick={onClose} aria-label="Close">
            &#10005;
          </button>
        </div>

        <div className="picker-options">
          {values.map(val => (
            <button
              key={val}
              className={`picker-option ${currentValue === val ? 'selected' : ''}`}
              onClick={() => { onSelect(val); onClose() }}
            >
              <ImgTile folder={folder} name={val} size={52} />
              <span className="picker-option-label">{val}</span>
            </button>
          ))}
        </div>

        {currentValue && (
          <button
            className="picker-clear"
            onClick={() => { onSelect(undefined); onClose() }}
          >
            Clear Selection
          </button>
        )}

      </div>
    </div>
  )
}

// ─── Cell CSS class helper ─────────────────────────────────────────────────────
function getCellClass(adventurer, category, cellStatus) {
  const key    = `${adventurer}-${category}`
  const status = cellStatus[key]
  let cls = 'g-cell'
  if (status === 'correct')   cls += ' cell-correct'
  if (status === 'wrong')     cls += ' cell-wrong'
  if (status === 'solving')   cls += ' cell-solving'
  if (status === 'backtrack') cls += ' cell-backtrack'
  if (status === 'solved')    cls += ' cell-solved'
  return cls
}

// ─── Grid component ────────────────────────────────────────────────────────────
export default function Grid({ assignment, cellStatus, isSolving, onCellChange }) {
  const [picker, setPicker] = useState(null) // { adventurer, category }

  const openPicker = (adventurer, category) => {
    if (isSolving) return
    setPicker({ adventurer, category })
  }

  return (
    <div className="grid-wrap">
      <div className="grid-scroll">
        <table className="g-table">

          {/* Column headers — adventurer portraits */}
          <thead>
            <tr>
              <th className="g-corner" />
              {ADVENTURERS.map(adv => (
                <th key={adv} className="g-col-header">
                  <div className="adv-header">
                    <ImgTile folder="adventurers" name={adv} size={60} />
                    <span className="adv-name">{adv}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows — one per category */}
          <tbody>
            {CATEGORIES.map(cat => (
              <tr key={cat}>
                <td className="g-row-header">
                  <div className="cat-header">
                    <span className="cat-label">{CATEGORY_LABELS[cat]}</span>
                  </div>
                </td>

                {ADVENTURERS.map(adv => {
                  const value  = assignment[adv]?.[cat]
                  const folder = CATEGORY_FOLDERS[cat]

                  return (
                    <td
                      key={adv}
                      className={getCellClass(adv, cat, cellStatus)}
                      onClick={() => openPicker(adv, cat)}
                    >
                      {value ? (
                        <div className="cell-filled">
                          <ImgTile folder={folder} name={value} size={38} />
                          <span className="cell-label">{value}</span>
                        </div>
                      ) : (
                        <span className="cell-empty">?</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Value picker modal */}
      {picker && (
        <ValuePicker
          adventurer={picker.adventurer}
          category={picker.category}
          currentValue={assignment[picker.adventurer]?.[picker.category]}
          onSelect={val => onCellChange(picker.adventurer, picker.category, val)}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  )
}
