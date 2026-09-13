import { useNavigate } from 'react-router-dom'

export default function HowToPlay() {
  const navigate = useNavigate()

  return (
    <div className="page">

      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/')}>&larr; Return</button>
        <h1 className="page-title">How to Play</h1>
      </div>

      <div className="howto">

        <section className="howto-section">
          <h2 className="howto-heading">The Objective</h2>
          <p className="howto-text">
            Five adventurers have gathered in the realm. Each holds a unique Race,
            Realm, Familiar, and Class. Using the ancient scroll of clues, determine
            which trait belongs to which adventurer.
          </p>
        </section>

        <section className="howto-section">
          <h2 className="howto-heading">The Grid</h2>
          <p className="howto-text">
            The grid shows five adventurers as columns and four categories as rows.
            Tap any cell to open the value picker and assign a trait. Each value may
            only be assigned once per row — no two adventurers share the same Race,
            Realm, Familiar, or Class.
          </p>
        </section>

        <section className="howto-section">
          <h2 className="howto-heading">Reading the Clues</h2>
          <p className="howto-text">
            Clues describe relationships between traits. Three types exist:
          </p>
          <ul className="howto-list">
            <li>
              <em>"Aldric is a Human"</em> — a direct assignment to one adventurer
            </li>
            <li>
              <em>"The Mage hails from the Forest Realm"</em> — whoever is the Mage
              also lives in the Forest
            </li>
            <li>
              <em>"The Paladin does not dwell in Shadow"</em> — an exclusion rule
              between two traits
            </li>
          </ul>
        </section>

        <section className="howto-section">
          <h2 className="howto-heading">Controls</h2>
          <ul className="howto-list">
            <li>
              <strong>Consult Oracle</strong> — The AI solves the puzzle step by step
              using a Constraint Satisfaction backtracking algorithm. Watch it assign
              values, detect contradictions, and backtrack in real time.
            </li>
            <li>
              <strong>Check Answers</strong> — Verify your current assignments.
              Correct cells glow green; incorrect cells glow red.
            </li>
            <li>
              <strong>Reset</strong> — Clear the board and start over.
            </li>
          </ul>
        </section>

        <section className="howto-section">
          <h2 className="howto-heading">The Oracle and AI</h2>
          <p className="howto-text">
            The Oracle applies a Constraint Satisfaction Problem (CSP) algorithm
            with backtracking search. Variables are the adventurer-category pairs.
            Domains are the five possible values per category. Constraints are the
            clues on the scroll. The solver propagates constraints, prunes impossible
            assignments, and backtracks when a contradiction is found — the same
            family of algorithms used in real-world scheduling, planning, and puzzle
            solving across Artificial Intelligence.
          </p>
        </section>

        <button className="btn-medieval primary" onClick={() => navigate('/select')}>
          Begin Quest
        </button>

      </div>
    </div>
  )
}
