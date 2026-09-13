import { ADVENTURERS, CATEGORIES, CATEGORY_VALUES } from './puzzles.js'

// ─── Clue checker ─────────────────────────────────────────────────────────────
function checkClue(clue, assignment) {
  switch (clue.type) {
    case 'direct': {
      const a = assignment[clue.adventurer]
      if (!a) return true
      const val = a[clue.category]
      if (val === undefined) return true
      return val === clue.value
    }

    case 'direct_not': {
      const a = assignment[clue.adventurer]
      if (!a) return true
      const val = a[clue.category]
      if (val === undefined) return true
      return val !== clue.value
    }

    case 'same': {
      // Whoever has cat1=val1 must also have cat2=val2, and vice versa
      for (const name of ADVENTURERS) {
        const a = assignment[name]
        if (!a) continue
        if (a[clue.cat1] === clue.val1) {
          if (a[clue.cat2] !== undefined && a[clue.cat2] !== clue.val2) return false
        }
        if (a[clue.cat2] === clue.val2) {
          if (a[clue.cat1] !== undefined && a[clue.cat1] !== clue.val1) return false
        }
      }
      return true
    }

    case 'not': {
      // No one may have both cat1=val1 and cat2=val2
      for (const name of ADVENTURERS) {
        const a = assignment[name]
        if (!a) continue
        if (a[clue.cat1] === clue.val1 && a[clue.cat2] === clue.val2) return false
      }
      return true
    }

    default:
      return true
  }
}

// ─── Uniqueness guard ──────────────────────────────────────────────────────────
function isUnique(assignment, adventurer, category, value) {
  for (const name of ADVENTURERS) {
    if (name === adventurer) continue
    const a = assignment[name]
    if (a && a[category] === value) return false
  }
  return true
}

// ─── Backtracking search ───────────────────────────────────────────────────────
function backtrack(clues, assignment, advIdx, catIdx, steps) {
  if (advIdx >= ADVENTURERS.length) {
    return JSON.parse(JSON.stringify(assignment))
  }

  const adventurer = ADVENTURERS[advIdx]

  if (catIdx >= CATEGORIES.length) {
    return backtrack(clues, assignment, advIdx + 1, 0, steps)
  }

  const category = CATEGORIES[catIdx]

  // Already assigned — skip
  if (assignment[adventurer][category] !== undefined) {
    return backtrack(clues, assignment, advIdx, catIdx + 1, steps)
  }

  for (const value of CATEGORY_VALUES[category]) {
    if (!isUnique(assignment, adventurer, category, value)) continue

    // Try this value
    assignment[adventurer][category] = value
    steps.push({
      adventurer,
      category,
      value,
      action: 'assign',
      snapshot: JSON.parse(JSON.stringify(assignment)),
    })

    if (clues.every(c => checkClue(c, assignment))) {
      const result = backtrack(clues, assignment, advIdx, catIdx + 1, steps)
      if (result) return result
    }

    // Backtrack
    steps.push({
      adventurer,
      category,
      value,
      action: 'backtrack',
      snapshot: JSON.parse(JSON.stringify(assignment)),
    })
    delete assignment[adventurer][category]
  }

  return null
}

// ─── Public API ───────────────────────────────────────────────────────────────
export function solve(puzzle) {
  const assignment = {}
  for (const adv of ADVENTURERS) assignment[adv] = {}

  const steps = []
  const result = backtrack(puzzle.clues, assignment, 0, 0, steps)
  return { result, steps }
}
