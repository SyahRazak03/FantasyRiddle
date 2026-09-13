/**
 * logic.js
 * Converts puzzle clues into First Order Logic (FOL) and Prolog representations.
 * Used in the CluePanel tabs to demonstrate the AI theory behind each constraint.
 */

const lc  = s => s.toLowerCase()
const cap = s => s.charAt(0).toUpperCase() + s.slice(1)

// ─── FOL Generator ────────────────────────────────────────────────────────────
//
// Symbols used:
//   ∀  — universal quantifier  (for all)
//   ∃  — existential quantifier (there exists)
//   ¬  — negation
//   ∧  — conjunction (and)
//   ↔  — biconditional (if and only if)
//
export function clueToFOL(clue) {
  switch (clue.type) {

    // "Aldric is a Human"
    // → Race(Aldric, Human)
    case 'direct':
      return `${cap(clue.category)}(${clue.adventurer}, ${clue.value})`

    // "Sylva is not a Warrior"
    // → ¬Class(Sylva, Warrior)
    case 'direct_not':
      return `\u00AC${cap(clue.category)}(${clue.adventurer}, ${clue.value})`

    // "The Druid dwells in the Shadow Realm"
    // → ∀x [Race(x, Druid) ↔ Realm(x, Shadow)]
    case 'same':
      return (
        `\u2200x [${cap(clue.cat1)}(x, ${clue.val1})` +
        ` \u2194 ${cap(clue.cat2)}(x, ${clue.val2})]`
      )

    // "The Rogue does not hail from the Forest"
    // → ¬∃x [Class(x, Rogue) ∧ Realm(x, Forest)]
    case 'not':
      return (
        `\u00AC\u2203x [${cap(clue.cat1)}(x, ${clue.val1})` +
        ` \u2227 ${cap(clue.cat2)}(x, ${clue.val2})]`
      )

    default:
      return ''
  }
}

// ─── Prolog Generator ─────────────────────────────────────────────────────────
//
// Representations:
//   Fact          — direct assignment:   race(aldric, human).
//   Integrity     — negation / not:      :- class(sylva, warrior).
//   Horn clause   — biconditional:       realm(X, shadow) :- race(X, druid).
//                                        race(X, druid)   :- realm(X, shadow).
//
export function clueToProlog(clue) {
  switch (clue.type) {

    // "Aldric is a Human"
    // → race(aldric, human).
    case 'direct':
      return `${lc(clue.category)}(${lc(clue.adventurer)}, ${lc(clue.value)}).`

    // "Sylva is not a Warrior"
    // → :- class(sylva, warrior).
    case 'direct_not':
      return `:- ${lc(clue.category)}(${lc(clue.adventurer)}, ${lc(clue.value)}).`

    // "The Druid dwells in the Shadow Realm"  (bidirectional → two Horn clauses)
    // → realm(X, shadow) :- race(X, druid).
    //   race(X, druid)   :- realm(X, shadow).
    case 'same':
      return (
        `${lc(clue.cat2)}(X, ${lc(clue.val2)}) :-\n` +
        `    ${lc(clue.cat1)}(X, ${lc(clue.val1)}).\n\n` +
        `${lc(clue.cat1)}(X, ${lc(clue.val1)}) :-\n` +
        `    ${lc(clue.cat2)}(X, ${lc(clue.val2)}).`
      )

    // "The Rogue does not hail from the Forest"  (integrity constraint)
    // → :- class(X, rogue), realm(X, forest).
    case 'not':
      return (
        `:- ${lc(clue.cat1)}(X, ${lc(clue.val1)}),\n` +
        `   ${lc(clue.cat2)}(X, ${lc(clue.val2)}).`
      )

    default:
      return ''
  }
}

// ─── Legend text shown at top of each tab ─────────────────────────────────────
export const FOL_LEGEND = [
  { symbol: '∀x',  meaning: 'For all adventurers x' },
  { symbol: '∃x',  meaning: 'There exists an adventurer x' },
  { symbol: '¬',   meaning: 'Negation — it is NOT the case that' },
  { symbol: '∧',   meaning: 'Conjunction — AND' },
  { symbol: '↔',   meaning: 'Biconditional — if and only if' },
]

export const PROLOG_LEGEND = [
  { symbol: 'fact.',          meaning: 'A direct ground fact' },
  { symbol: 'head :- body.',  meaning: 'Horn clause — head is true if body holds' },
  { symbol: ':- goal.',       meaning: 'Integrity constraint — goal must not be true' },
  { symbol: 'X',              meaning: 'Unbound variable (any adventurer)' },
]
