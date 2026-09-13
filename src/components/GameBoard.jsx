import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PUZZLES, ADVENTURERS, CATEGORIES } from '../engine/puzzles'
import { solve } from '../engine/cspSolver'
import Grid      from './Grid'
import CluePanel from './CluePanel'
import AIPanel   from './AIPanel'

const STEP_DELAY = 60 // ms between solver animation steps

const emptyAssignment = () => {
  const a = {}
  for (const adv of ADVENTURERS) a[adv] = {}
  return a
}

export default function GameBoard() {
  const { puzzleId } = useParams()
  const navigate     = useNavigate()
  const puzzle       = PUZZLES.find(p => p.id === parseInt(puzzleId))

  const [assignment, setAssignment] = useState(emptyAssignment)
  const [cellStatus, setCellStatus] = useState({})   // key: 'Adv-cat' => status string
  const [isSolving,  setIsSolving]  = useState(false)
  const [gameWon,    setGameWon]    = useState(false)
  const [message,    setMessage]    = useState(null)

  useEffect(() => {
    if (!puzzle) navigate('/select')
  }, [puzzle, navigate])

  // ── Cell change ──────────────────────────────────────────────────────────
  const handleCellChange = useCallback((adventurer, category, value) => {
    if (isSolving) return
    setGameWon(false)
    setMessage(null)
    setCellStatus({})
    setAssignment(prev => ({
      ...prev,
      [adventurer]: {
        ...prev[adventurer],
        // Toggle: clicking the same value again clears it
        [category]: prev[adventurer][category] === value ? undefined : value,
      },
    }))
  }, [isSolving])

  // ── Reset ────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (isSolving) return
    setAssignment(emptyAssignment())
    setCellStatus({})
    setGameWon(false)
    setMessage(null)
  }, [isSolving])

  // ── Check ────────────────────────────────────────────────────────────────
  const handleCheck = useCallback(() => {
    if (isSolving) return
    const status   = {}
    let allFilled  = true
    let allCorrect = true

    for (const adv of ADVENTURERS) {
      for (const cat of CATEGORIES) {
        const key     = `${adv}-${cat}`
        const userVal = assignment[adv][cat]
        const correct = puzzle.solution[adv][cat]

        if (userVal === undefined) {
          allFilled  = false
          allCorrect = false
        } else if (userVal === correct) {
          status[key] = 'correct'
        } else {
          status[key] = 'wrong'
          allCorrect  = false
        }
      }
    }

    setCellStatus(status)

    if (!allFilled) {
      setMessage('The scroll is incomplete. Fill every cell before checking.')
    } else if (allCorrect) {
      setGameWon(true)
      setMessage(null)
    } else {
      setMessage('Some answers are incorrect. Consult the clues again.')
    }
  }, [assignment, puzzle, isSolving])

  // ── Oracle solve ─────────────────────────────────────────────────────────
  const handleSolve = useCallback(() => {
    if (isSolving) return
    setMessage(null)
    setGameWon(false)
    setCellStatus({})
    setIsSolving(true)

    const { result, steps } = solve(puzzle)

    if (!result) {
      setIsSolving(false)
      setMessage('The Oracle could not find a solution.')
      return
    }

    let i = 0

    const tick = () => {
      if (i >= steps.length) {
        // Animation complete — show final solved state
        setAssignment(result)
        const finalStatus = {}
        for (const adv of ADVENTURERS)
          for (const cat of CATEGORIES)
            finalStatus[`${adv}-${cat}`] = 'solved'
        setCellStatus(finalStatus)
        setIsSolving(false)
        setGameWon(true)
        return
      }

      const step = steps[i]
      const key  = `${step.adventurer}-${step.category}`

      if (step.action === 'assign') {
        setAssignment(JSON.parse(JSON.stringify(step.snapshot)))
        setCellStatus(prev => ({ ...prev, [key]: 'solving' }))
      } else {
        // Backtrack: flash red then clear
        setCellStatus(prev => ({ ...prev, [key]: 'backtrack' }))
        setTimeout(() => {
          setAssignment(JSON.parse(JSON.stringify(step.snapshot)))
          setCellStatus(prev => {
            const next = { ...prev }
            delete next[key]
            return next
          })
        }, STEP_DELAY / 2)
      }

      i++
      setTimeout(tick, STEP_DELAY)
    }

    setTimeout(tick, 300)
  }, [puzzle, isSolving])

  if (!puzzle) return null

  return (
    <div className="gameboard">

      {/* Header */}
      <div className="gameboard-header">
        <button className="btn-back" onClick={() => navigate('/select')}>
          &larr; Scrolls
        </button>
        <div>
          <div className="gameboard-diff">{puzzle.difficulty.toUpperCase()}</div>
          <h1 className="gameboard-title">{puzzle.name}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="gameboard-body">

        {/* Left: clue scroll */}
        <CluePanel clues={puzzle.clues} />

        {/* Right: grid + controls */}
        <div className="gameboard-right">

          <Grid
            assignment={assignment}
            cellStatus={cellStatus}
            isSolving={isSolving}
            onCellChange={handleCellChange}
          />

          {/* Controls */}
          <div className="gameboard-controls">
            <button
              className="btn-medieval primary"
              onClick={handleSolve}
              disabled={isSolving}
            >
              {isSolving ? 'Oracle Speaks...' : 'Consult Oracle'}
            </button>
            <button
              className="btn-medieval"
              onClick={handleCheck}
              disabled={isSolving}
            >
              Check Answers
            </button>
            <button
              className="btn-medieval danger"
              onClick={handleReset}
              disabled={isSolving}
            >
              Reset
            </button>
          </div>

          {/* AI concept panel */}
          <AIPanel isSolving={isSolving} gameWon={gameWon} />

          {/* Status messages */}
          {message && <p className="game-message">{message}</p>}

          {gameWon && (
            <div className="win-banner">
              <span>&#9733;</span>
              The Oracle is satisfied. The truth is revealed.
              <span>&#9733;</span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
